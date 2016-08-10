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
from bs4 import BeautifulSoup
from collections import OrderedDict

# Dumps a dictionary to JSON file. format=False produces smaller files
def dump_to_file(data, filename, format=True):
    with open(filename, 'w') as outfile:
        if format:
            json.dump(data, outfile, indent=4, ensure_ascii=False)
        else:
            json.dump(data, outfile, ensure_ascii=False)

# Main program entry point:
def main():
    input_path = "data/html/gen1.html"
    print("Opening: "+input_path)
    soup = BeautifulSoup(open(input_path), 'html.parser')
    print("Document title: "+soup.title.string)

    # We are interested in the first table:
    table = soup.find_all('table')[0]

    # Extract all rows (lines) and remove first one(header):
    lines = []
    for line in table.find_all('tr'):
        lines.append(line)
    lines = lines[1:]

    # Dex holds all data, lookup is used to look up key(dex no.) from name:
    dex = OrderedDict()
    lookup = OrderedDict()

    # Order of stats is important, they don't have unique id's to find:
    stat_order = ["HP", "ATK", "DEF", "SPD", "SPC"]
    for mon in lines:
        monster = OrderedDict()

        # td fields in a row:
        # num | icon | name | HP | ATK | DEF | SPD | SPC
        fields = []
        for td in mon.find_all("td"):
            fields.append(td)

        # Extract non-stat fields:
        number = fields[0]
        icon = fields[1].find_all("img")[0].get("src")
        name = fields[2].string
        monster["name"] = name
        # monster["icon"] = icon

        # Extract stats, fields 3-7
        stats = OrderedDict()
        for i,stat in enumerate(stat_order):
            stats[stat] = int(fields[i+3].string)
        monster["stats"] = stats

        # Enter the monster into both main dict and lookup dict
        dex[num] = monster
        lookup[name] = num

    lookup = OrderedDict(sorted(lookup.items(), key=lambda t: t[0]))

    # Include metadata for licenses, authorship, information, timestamp etc.
    meta = OrderedDict()

    # Title of this file specifically:
    meta["title"] = "Generation 1 Base stats JSON for all 151 Pokémon (Red/Blue/Yellow)"

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
    meta["disclaimer"] = "Warning: All data and software is provided as-is, "+
                         "with no guarantee of any kind. Use at own risk."

    # JSON file last updated timestamp:
    meta["updated"] = datetime.datetime.utcnow().isoformat()

    # Source html file used to generate data:
    meta["source"] = {"title" : soup.title.string, "url" :
    "http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_I)"}

    # Put everything together
    data = OrderedDict()
    data["meta"] = meta
    data["lookup"] = lookup
    data["dex"] = dex

    # Dump(save) json files: mini is small
    dump_to_file(data, "data/json/gen1.json")
    dump_to_file(data, "data/json/gen1.mini.json", format=False)


if __name__ == '__main__':
    main()
