import sys
import json
import datetime
from bs4 import BeautifulSoup
from collections import OrderedDict
soup = BeautifulSoup(open("data/html/gen1.html"), 'html.parser')

def dump_to_file(data, filename, format=True):
    with open(filename, 'w') as outfile:
        if format:
            json.dump(data, outfile, indent=4, ensure_ascii=False)
        else:
            json.dump(data, outfile, ensure_ascii=False)

print(soup.title.string)

lines = []
table = soup.find_all('table')[0]

for line in table.find_all('tr'):
    lines.append(line)

lines = lines[1:]

monsters = OrderedDict()
lookup = OrderedDict()
stat_names = ["HP", "ATK", "DEF", "SPD", "SPC"]

for m in lines:
    titles = []
    for link in m.find_all():
        title = link.get("title")
        if(title != None):
            l = len(title)
            if l > 3:
                title = title[:-10]
            titles.append(title)
    assert len(titles) > 0
    monster = OrderedDict()
    monster["number"] = int(titles[0])
    monster["number_string"] = titles[0]
    monster["name"] = titles[1]
    fields = []
    for td in m.find_all("td"):
        fields.append(td)
    stats = OrderedDict()
    for i,stat in enumerate(stat_names):
        stats[stat] = int(fields[i+3].string)
    monster["stats"] = stats
    monster["icon"] = fields[1].find_all("img")[0].get("src")
    monsters[titles[0]] = monster
    lookup[titles[1]] = titles[0]

lookup = OrderedDict(sorted(lookup.items(), key=lambda t: t[0]))

# Include metadata for licenses,
meta = OrderedDict()
meta["author"] = { "url": "http://github.com/olehermanse",
"name":"Ole Herman Schumacher Elgesem"}
meta["credits"] = ["Bulbagarden", "Nintendo"]
meta["project"] = "https://github.com/olehermanse/pokres"
meta["license"] = {"data": "https://creativecommons.org/licenses/by-nc-sa/2.5/",
                   "software": "https://opensource.org/licenses/MIT"}
c =["Bulbapedia web content used in compliance with their license. ",
    "Pokémon and all respective names are copyrighted and trademarked by ",
    "Nintendo, and used for non-commercial purposes under 'Fair Use'. ",
    "This project and its author is in no way affiliated with Nintendo, ",
    "Pokémon Company or Bulbagarden."]
meta["copyright"] = c
meta["time created"] = datetime.datetime.utcnow().isoformat()
meta["source"] = {"title" : soup.title.string, "url" :
"http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_I)"}

data = OrderedDict()
data["meta"] = meta
data["lookup"] = lookup
data["dex"] = monsters
dump_to_file(data, "data/json/gen1.json")
dump_to_file(data, "data/json/gen1.mini.json", format=False)
