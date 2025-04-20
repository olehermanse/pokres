import * as React from "react";
import Button from "@mui/material/Button";

export default function InfoPage() {
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "3fr 1fr",
    maxWidth: "60em",
    margin: "0 auto",
  };

  return (
    <div style={gridStyle}>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/Individual_values">
        Individual values and stats in Pokémon games
      </Button>
      <div></div>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_in_Generation_I">
        Pokémon base stats in generation I
      </Button>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen1.json">
        (JSON)
      </Button>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_in_Generations_II-V">
        Pokémon base stats in generation II - V
      </Button>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen2-5.json">
        (JSON)
      </Button>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_in_Generation_VI">
        Pokémon base stats in generation VI
      </Button>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen6.json">
        (JSON)
      </Button>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_in_Generation_VII">
        Pokémon base stats in generation VII
      </Button>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen7.json">
        (JSON)
      </Button>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_in_Generation_VIII">
        Pokémon base stats in generation VIII
      </Button>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen8.json">
        (JSON)
      </Button>
      <Button href="https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_in_Generation_IX">
        Pokémon base stats in generation IX
      </Button>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen9.json">
        (JSON)
      </Button>
      <Button href="https://github.com/olehermanse/pokres">GitHub repo</Button>
      <div></div>
      <Button href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/LICENSE.txt">
        License/Copyright ©
      </Button>
    </div>
  );
}
