import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import AutoComplete from "material-ui/AutoComplete";

function gen1_calc_stat(name, level, base, DV, EV) {
  console.log("Generation 1 calculator");
  level = Number(level);
  base = Number(base);
  DV = Number(DV);
  EV = Number(EV);
  const EVpart = Math.floor(Math.ceil(Math.sqrt(EV)) / 4);
  const basepart = (base + DV) * 2;

  const levelpart = level * (basepart + EVpart);

  const mt = Math.floor(levelpart / 100);

  if (name == "HP") {
    return mt + level + 10;
  } else {
    return mt + 5;
  }

  return 0;
}

function gen3_calc_stat(name, level, base, IV, EV, nature) {
  console.log("Generation 3 calculator");
  level = Number(level);
  base = Number(base);
  IV = Number(IV);
  EV = Number(EV);
  nature = Number(nature);
  const EVpart = Math.floor(EV / 4);
  const levelpart = level * (2 * base + IV + EVpart);

  const mt = Math.floor(levelpart / 100);

  if (name == "HP") {
    return mt + level + 10;
  } else {
    return (mt + 5) * nature;
  }
  return 0;
}

function encounter_calc(level, names, baseStats, generation) {
  var stat_func = gen3_calc_stat;
  var maxnum = 31;
  if (generation === "1" || generation === "2") {
    stat_func = gen1_calc_stat;
    maxnum = 15;
  }
  var stats = [];
  for (var i = 0; i < baseStats.length; ++i) {
    const base = baseStats[i];
    const name = names[i];
    const min = stat_func(name, level, base, 0, 0);
    const max = stat_func(name, level, base, maxnum, 0);
    if (min === max) {
      stats.push("" + min);
    } else {
      stats.push("" + min + "-" + max);
    }
  }
  return stats;
}

function getSpecies(gen_json) {
  if (!gen_json) {
    return [];
  }
  const dex = gen_json["dex"];
  var res = [];
  for (var key in dex) {
    const spec = dex[key];
    res.push(spec.name);
  }
  return res;
}

function getStats(name, gen_json) {
  const order = gen_json.stats.order.map(function (x) {
    return "base_" + x;
  });
  const num = gen_json.lookup[name];
  const stats = gen_json.dex[num].stats;
  var dict = {};
  for (var i = 0; i < order.length; ++i) {
    dict[order[i]] = stats[i];
  }
  if ("base_SPC" in dict) {
    dict["base_SPA"] = dict["base_SPD"] = dict["base_SPC"];
    delete dict["base_SPC"];
  }
  console.log(dict);
  return dict;
}

export default class StatCalculator extends React.Component {
  state = {
    speciesName: "",
    level: "",
    base_HP: "",
    base_ATK: "",
    base_DEF: "",
    base_SPA: "",
    base_SPD: "",
    base_SPE: "",
    enc_HP: "",
    enc_ATK: "",
    enc_DEF: "",
    enc_SPA: "",
    enc_SPD: "",
    enc_SPE: "",
    iv_HP: "",
    iv_ATK: "",
    iv_DEF: "",
    iv_SPA: "",
    iv_SPD: "",
    iv_SPE: "",
    ev_HP: "",
    ev_ATK: "",
    ev_DEF: "",
    ev_SPA: "",
    ev_SPD: "",
    ev_SPE: "",
  };

  handleUpdateInput = (speciesName) => {
    this.setState({
      speciesName: speciesName,
    });
  };

  handleNewRequest = () => {
    this.setState(getStats(this.state.speciesName, this.props.data));
  };

  handleEncounter = () => {
    const statNames = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];
    const baseNames = statNames.map(function (st) {
      return "base_" + st;
    });
    const baseStats = baseNames.map(
      function (nm) {
        return this.state[nm];
      }.bind(this),
    );
    const level = this.state.level;
    var encounterStats = encounter_calc(
      level,
      statNames,
      baseStats,
      this.props.generation,
    );
    const encNames = statNames.map(function (st) {
      return "enc_" + st;
    });

    var newState = {};
    for (var i = 0; i < encNames.length; ++i) {
      const name = encNames[i];
      const stat = encounterStats[i];
      newState[name] = stat;
    }
    this.setState(newState);
  };

  textChange = (event) => {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  };

  render() {
    var ivlabel = "IV:";
    if (this.props.generation === "1" || this.props.generation === "2") {
      ivlabel = "DV:";
    }
    return (
      <div className="calc_grid">
        <AutoComplete
          hintText="Species"
          fullWidth={true}
          maxSearchResults={5}
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={getSpecies(this.props.data)}
          onNewRequest={this.handleNewRequest}
          searchText={this.state.speciesName}
          onUpdateInput={this.handleUpdateInput}
          style={{ gridArea: "spec" }}
        />

        <TextField
          hintText="Level"
          id="level"
          className="level"
          onChange={this.textChange}
          value={this.state.level}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="HP"
          id="base_HP"
          className="base_HP"
          onChange={this.textChange}
          value={this.state.base_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Atk"
          id="base_ATK"
          className="base_ATK"
          onChange={this.textChange}
          value={this.state.base_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Def"
          id="base_DEF"
          className="base_DEF"
          onChange={this.textChange}
          value={this.state.base_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpA"
          id="base_SPA"
          className="base_SPA"
          onChange={this.textChange}
          value={this.state.base_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpD"
          id="base_SPD"
          className="base_SPD"
          onChange={this.textChange}
          value={this.state.base_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Spe"
          id="base_SPE"
          className="base_SPE"
          onChange={this.textChange}
          value={this.state.base_SPE}
          style={{ width: "1fr" }}
        />

        <RaisedButton
          onClick={this.handleEncounter}
          label="Encounter:"
          className="encounter"
        />

        <TextField
          hintText="HP"
          id="enc_HP"
          className="enc_HP"
          onChange={this.textChange}
          value={this.state.enc_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Atk"
          id="enc_ATK"
          className="enc_ATK"
          onChange={this.textChange}
          value={this.state.enc_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Def"
          id="enc_DEF"
          className="enc_DEF"
          onChange={this.textChange}
          value={this.state.enc_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpA"
          id="enc_SPA"
          className="enc_SPA"
          onChange={this.textChange}
          value={this.state.enc_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpD"
          id="enc_SPD"
          className="enc_SPD"
          onChange={this.textChange}
          value={this.state.enc_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Spe"
          id="enc_SPE"
          className="enc_SPE"
          onChange={this.textChange}
          value={this.state.enc_SPE}
          style={{ width: "1fr" }}
        />

        <RaisedButton
          onClick={this.handleEncounter}
          label="EV:"
          className="ev"
        />

        <TextField
          hintText="HP"
          id="ev_HP"
          className="ev_HP"
          onChange={this.textChange}
          value={this.state.ev_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Atk"
          id="ev_ATK"
          className="ev_ATK"
          onChange={this.textChange}
          value={this.state.ev_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Def"
          id="ev_DEF"
          className="ev_DEF"
          onChange={this.textChange}
          value={this.state.ev_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpA"
          id="ev_SPA"
          className="ev_SPA"
          onChange={this.textChange}
          value={this.state.ev_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpD"
          id="ev_SPD"
          className="ev_SPD"
          onChange={this.textChange}
          value={this.state.ev_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Spe"
          id="ev_SPE"
          className="ev_SPE"
          onChange={this.textChange}
          value={this.state.ev_SPE}
          style={{ width: "1fr" }}
        />

        <RaisedButton onClick={this.handleIV} label={ivlabel} className="iv" />

        <TextField
          hintText="HP"
          id="iv_HP"
          className="iv_HP"
          onChange={this.textChange}
          value={this.state.iv_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Atk"
          id="iv_ATK"
          className="iv_ATK"
          onChange={this.textChange}
          value={this.state.iv_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Def"
          id="iv_DEF"
          className="iv_DEF"
          onChange={this.textChange}
          value={this.state.iv_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpA"
          id="iv_SPA"
          className="iv_SPA"
          onChange={this.textChange}
          value={this.state.iv_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="SpD"
          id="iv_SPD"
          className="iv_SPD"
          onChange={this.textChange}
          value={this.state.iv_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          hintText="Spe"
          id="iv_SPE"
          className="iv_SPE"
          onChange={this.textChange}
          value={this.state.iv_SPE}
          style={{ width: "1fr" }}
        />
      </div>
    );
  }
}
