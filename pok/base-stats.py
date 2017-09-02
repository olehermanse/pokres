#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Parses a html file and extracts stats to JSON."""

__authors__    = ["Ole Herman Schumacher Elgesem"]
__credits__    = ["Bulbagarden"]
__license__    = "MIT"
# This file is subject to the terms and conditions defined in
# file 'LICENSE.txt', which is part of this source code package.

import sys
import json
import datetime
import requests
import os
from bs4 import BeautifulSoup
from collections import OrderedDict

# Dumps a dictionary to JSON file. format=False produces smaller files
def dump_to_file(data, filename, format=True):
    with open(filename, 'w') as outfile:
        if format:
            json.dump(data, outfile, indent=4, ensure_ascii=False)
        else:
            json.dump(data, outfile, ensure_ascii=False)

def download_html(html_path, url):
    print("Downloading: {}".format(url))
    r = requests.get(url)
    with open(html_path, "wb") as dest:
        dest.write(r.content)

def generate_main(file_name, url, stat_order, stat_names, title):
    input_path = "res/html/"+file_name+".html"
    if not os.path.exists(input_path):
        download_html(input_path, url)
    print("Opening: "+input_path)
    soup = BeautifulSoup(open(input_path), 'html.parser')
    print("Document title: "+soup.title.string)

    # We are interested in the first table:
    table = soup.find_all('table')[0]
    if(table.find_all("b")[0].string == "Shortcuts"):
        table = soup.find_all('table')[1]

    # Extract all rows (lines) and remove first one(header):
    lines = []
    for line in table.find_all('tr'):
        lines.append(line)

    lines = lines[1:]

    # Dex holds all data, lookup is used to look up key(dex no.) from name:
    dex = OrderedDict()
    lookup = OrderedDict()

    # Order of stats is important, they don't have unique id's to find:
    stat_abbrev = OrderedDict()
    for i,v in enumerate(stat_order):
        stat_abbrev[v] = stat_names[i]
    stat_meta = OrderedDict()
    stat_meta["order"] = stat_order
    stat_meta["names"] = stat_abbrev
    order = []
    for mon in lines:
        monster = OrderedDict()

        # td fields in a row:
        # num | icon | name | HP | ...
        fields = []
        for td in mon.find_all("td"):
            fields.append(td)
        # Extract non-stat fields:
        num = fields[0].find_all("b")[0].string
        icon = fields[1].find_all("img")[0].get("src")
        name = fields[2].find_all("a")[0].string
        small = fields[2].find_all("small")
        if(len(small)>0):
            num = num[0:3]
            small=small[0].string
            name += small
            small = small.replace("(","").replace(")","")
            small = "".join([word[0] for word in small.split()])
            num += small
            while(num in dex):
                num += 'I'

        monster["name"] = name
        # monster["icon"] = icon

        # Extract stats, fields 3-7
        stats = []
        for i,stat in enumerate(stat_order):
            stats.append(int(fields[i+3].string))
        monster["stats"] = stats

        # Enter the monster into main dict, lookup dict and order list
        dex[num] = monster
        lookup[name] = num
        order.append(num)

    lookup = OrderedDict(sorted(lookup.items(), key=lambda t: t[0]))

    # Include metadata for licenses, authorship, information, timestamp etc.
    meta = OrderedDict()

    # Title of this file specifically:
    meta["title"] = title

    # General info about the whole project:
    project = OrderedDict()
    project["author"]   =  "Ole Herman Schumacher Elgesem"
    project["url"]      =  "https://github.com/olehermanse/pokres"
    project["license"]  = {"data/resources":
                           "https://creativecommons.org/licenses/by-nc-sa/2.5/",
                           "software": "https://opensource.org/licenses/MIT"}
    project["credits"]  = ["Bulbagarden", "Nintendo"]
    meta["project"] = project

    # Copyright disclaimer:
    c =["Bulbapedia web content used in compliance with their license. ",
        "Pokémon and all respective names are copyrighted and trademarked by ",
        "Nintendo, and used for non-commercial purposes under 'Fair Use'. ",
        "This project and its author is in no way affiliated with Nintendo, ",
        "Pokémon Company or Bulbagarden."]
    meta["copyright"] = c

    # Disclaimer:
    meta["disclaimer"] = "Warning: All data and software is provided as-is, "+\
                         "with no guarantee of any kind. Use at own risk."

    # JSON file last updated timestamp:
    meta["updated"] = datetime.datetime.utcnow().isoformat()

    # Source html file used to generate data:
    meta["source"] = {"title" : soup.title.string, "url" : url}

    # Put everything together
    data = OrderedDict()
    data["meta"] = meta
    data["stats"] = stat_meta
    data["lookup"] = lookup
    data["dex"] = dex
    data["order"] = order
    assert len(dex) == len(lookup) and len(dex) == len(order)

    # Dump(save) json files: mini is small
    dump_to_file(data, "res/json/"+file_name+".json")
    dump_to_file(data, "res/json/"+file_name+".mini.json", format=False)

if __name__ == '__main__':
    generate_main(\
        file_name = "gen1",\
        url = "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_I)",\
        stat_order  = ["HP", "ATK", "DEF", "SPE", "SPC"],\
        stat_names  = ["Hit Points", "Attack", "Defense", "Speed", "Special"],\
        title = "Generation 1 Base stats JSON "+\
                "for all 151 Pokémon (Red/Blue/Yellow)")
    generate_main(\
        file_name = "gen2-5",\
        url = "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_II-V)",\
        stat_order  = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"],\
        stat_names  = ["Hit Points", "Attack", "Defense", \
                      "Special Attack", "Special Defense", "Speed"],\
        title = "Generation 2-5 Base stats JSON "+\
                "for all 649 Pokémon (GSC/RSE/DPP/BW)")
    generate_main(\
        file_name = "gen6",\
        url = "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VI)",\
        stat_order  = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"],\
        stat_names  = ["Hit Points", "Attack", "Defense", \
                      "Special Attack", "Special Defense", "Speed"],\
        title = "Generation 6 Base stats JSON "+\
                "for all 721 Pokémon (XY/ORAS)")
    generate_main(\
        file_name = "gen7",\
        url = "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VII-present)",\
        stat_order  = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"],\
        stat_names  = ["Hit Points", "Attack", "Defense", \
                      "Special Attack", "Special Defense", "Speed"],\
        title = "Generation 7 Base stats JSON "+\
                "for all 802 Pokémon (Sun/Moon)")
