import React from "react";
import ReactDOM from "react-dom";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import FlatButton from "material-ui/FlatButton";

export default class InfoPage extends React.Component {
  render() {
    var gridStyle = {
      display: "grid",
      gridTemplateColumns: "3fr 1fr",
      maxWidth: "40em",
      margin: "0 auto",
    };

    return (
      <div style={gridStyle}>
        <FlatButton
          label="Individual values and stats in Pokémon games"
          href="https://bulbapedia.bulbagarden.net/wiki/Individual_values"
        />
        <div />
        <FlatButton
          label="Pokémon base stats in generation I"
          href="http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_I)"
        />
        <FlatButton
          label="(JSON)"
          href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen1.json"
        />
        <FlatButton
          label="Pokémon base stats in generation II - V"
          href="http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_II-V)"
        />
        <FlatButton
          label="(JSON)"
          href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen2-5.json"
        />
        <FlatButton
          label="Pokémon base stats in generation VI"
          href="http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VI)"
        />
        <FlatButton
          label="(JSON)"
          href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen6.json"
        />
        <FlatButton
          label="Pokémon base stats in generation VII"
          href="http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_base_stats_(Generation_VII-present)"
        />
        <FlatButton
          label="(JSON)"
          href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/res/json/gen7.json"
        />
        <FlatButton
          href="https://raw.githubusercontent.com/olehermanse/pokres/gh-pages/LICENSE.txt"
          label="License/Copyright ©"
        />
      </div>
    );
  }
}
