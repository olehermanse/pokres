import * as React from "react";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

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

function gen3_calc_stat(name, level, base, IV, EV) {
  const nature = 1.0;
  level = Number(level);
  base = Number(base);
  IV = Number(IV);
  EV = Number(EV);
  const EVpart = Math.floor(EV / 4);
  const levelpart = level * (2 * base + IV + EVpart);
  const mt = Math.floor(levelpart / 100);

  if (name == "HP") {
    return mt + level + 10;
  }
  return (mt + 5) * nature;
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

  handleNewRequest = (event) => {
    console.log("Request:");
    console.log(event);
    let speciesName = event.target.innerText;
    if (
      speciesName === undefined ||
      speciesName === null ||
      speciesName === ""
    ) {
      speciesName = event.target.value;
    }
    if (speciesName === "") {
      return;
    }
    console.log("speciesName:");
    console.log(speciesName);
    this.setState({
      speciesName: speciesName,
    });
    this.setState(getStats(speciesName, this.props.data));
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
    var ivlabel = "IV";
    if (this.props.generation === "1" || this.props.generation === "2") {
      ivlabel = "DV";
    }
    return (
      <div className="calc_grid">
        <Autocomplete
          fullWidth={true}
          filter={Autocomplete.caseInsensitiveFilter}
          options={getSpecies(this.props.data)}
          onChange={this.handleNewRequest}
          style={{ gridArea: "spec" }}
          renderInput={(params) => (
            <TextField {...params} label="Species" variant="standard" />
          )}
        />

        <TextField
          label="Level"
          id="level"
          className="level"
          onChange={this.textChange}
          value={this.state.level}
          style={{ width: "1fr" }}
        />

        <TextField
          label="HP"
          id="base_HP"
          className="base_HP"
          onChange={this.textChange}
          value={this.state.base_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Atk"
          id="base_ATK"
          className="base_ATK"
          onChange={this.textChange}
          value={this.state.base_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Def"
          id="base_DEF"
          className="base_DEF"
          onChange={this.textChange}
          value={this.state.base_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpA"
          id="base_SPA"
          className="base_SPA"
          onChange={this.textChange}
          value={this.state.base_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpD"
          id="base_SPD"
          className="base_SPD"
          onChange={this.textChange}
          value={this.state.base_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Spe"
          id="base_SPE"
          className="base_SPE"
          onChange={this.textChange}
          value={this.state.base_SPE}
          style={{ width: "1fr" }}
        />

        <Button
          style={{ height: "100%" }}
          onClick={this.handleEncounter}
          variant="outlined"
        >
          Encounter
        </Button>

        <TextField
          label="HP"
          id="enc_HP"
          className="enc_HP"
          onChange={this.textChange}
          value={this.state.enc_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Atk"
          id="enc_ATK"
          className="enc_ATK"
          onChange={this.textChange}
          value={this.state.enc_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Def"
          id="enc_DEF"
          className="enc_DEF"
          onChange={this.textChange}
          value={this.state.enc_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpA"
          id="enc_SPA"
          className="enc_SPA"
          onChange={this.textChange}
          value={this.state.enc_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpD"
          id="enc_SPD"
          className="enc_SPD"
          onChange={this.textChange}
          value={this.state.enc_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Spe"
          id="enc_SPE"
          className="enc_SPE"
          onChange={this.textChange}
          value={this.state.enc_SPE}
          style={{ width: "1fr" }}
        />

        <Button
          style={{ height: "100%" }}
          onClick={this.handleEncounter}
          variant="outlined"
        >
          EV
        </Button>

        <TextField
          label="HP"
          id="ev_HP"
          className="ev_HP"
          onChange={this.textChange}
          value={this.state.ev_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Atk"
          id="ev_ATK"
          className="ev_ATK"
          onChange={this.textChange}
          value={this.state.ev_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Def"
          id="ev_DEF"
          className="ev_DEF"
          onChange={this.textChange}
          value={this.state.ev_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpA"
          id="ev_SPA"
          className="ev_SPA"
          onChange={this.textChange}
          value={this.state.ev_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpD"
          id="ev_SPD"
          className="ev_SPD"
          onChange={this.textChange}
          value={this.state.ev_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Spe"
          id="ev_SPE"
          className="ev_SPE"
          onChange={this.textChange}
          value={this.state.ev_SPE}
          style={{ width: "1fr" }}
        />

        <Button
          style={{ height: "100%" }}
          onClick={this.handleIV}
          variant="outlined"
          className="iv"
        >
          {ivlabel}
        </Button>

        <TextField
          label="HP"
          id="iv_HP"
          className="iv_HP"
          onChange={this.textChange}
          value={this.state.iv_HP}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Atk"
          id="iv_ATK"
          className="iv_ATK"
          onChange={this.textChange}
          value={this.state.iv_ATK}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Def"
          id="iv_DEF"
          className="iv_DEF"
          onChange={this.textChange}
          value={this.state.iv_DEF}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpA"
          id="iv_SPA"
          className="iv_SPA"
          onChange={this.textChange}
          value={this.state.iv_SPA}
          style={{ width: "1fr" }}
        />

        <TextField
          label="SpD"
          id="iv_SPD"
          className="iv_SPD"
          onChange={this.textChange}
          value={this.state.iv_SPD}
          style={{ width: "1fr" }}
        />

        <TextField
          label="Spe"
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
