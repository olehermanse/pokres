import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';

function gen1_calc_stat(stat, level, base, DV, EV) {
    level = Number(level);
    base = Number(base);
    DV = Number(DV);
    EV = Number(EV);
    const EVpart = Math.floor(Math.ceil(Math.sqrt(EV)) / 4);
    const basepart = (base + DV) * 2;

    const levelpart = level * (basepart + EVpart);

    const mt = Math.floor(levelpart / 100);

    if (stat == "HP") {
        return mt + level + 10;
    } else {
        return mt + 5;
    }
    return 0;
}

function gen1_encounter_calc(level, names, baseStats) {
    var stats = []
    for (var i = 0; i < baseStats.length; ++i){
      const base = baseStats[i];
      const name = names[i];
      const min = gen1_calc_stat(name, level, base, 0, 0);
      const max = gen1_calc_stat(name, level, base, 15, 0);
      if (min === max){
        stats.push(""+min);
      }
      else{
        stats.push("" + min + "-" + max);
      }
    }
    return stats;
}


function getSpecies(gen_json){
  if (!gen_json){
    return [];
  }
  const dex = gen_json["dex"];
  var res = [];
  for (var key in dex){
    const spec = dex[key];
    res.push(spec.name);
  }
  return res;
}

function getStats(name, gen_json){
  const order = gen_json.stats.order.map(function(x){return "base_"+x});
  const num = gen_json.lookup[name];
  const stats = gen_json.dex[num].stats;
  var dict = {};
  for (var i = 0; i<order.length; ++i){
    dict[order[i]] = stats[i];
  }
  if ("base_SPC" in dict){
    dict["base_SPA"] = dict["base_SPD"] = dict["base_SPC"];
    delete dict["base_SPC"];
  }
  console.log(dict);
  return dict
}

export default class StatCalculator extends React.Component {
  state = {"speciesName": "",
           "level": "",
           "base_HP":  "",
           "base_ATK": "",
           "base_DEF": "",
           "base_SPA": "",
           "base_SPD": "",
           "base_SPE": "",
           "enc_HP":   "",
           "enc_ATK":  "",
           "enc_DEF":  "",
           "enc_SPA":  "",
           "enc_SPD":  "",
           "enc_SPE":  ""};

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
    const baseNames = statNames.map(function(st){return "base_"+st;});
    const baseStats = baseNames.map(function(nm){return this.state[nm];}.bind(this));
    console.log(baseStats);
    const level = this.state.level;
    console.log(level);
    const encounterStats = gen1_encounter_calc(level, statNames, baseStats);
    console.log(encounterStats);
    const encNames = statNames.map(function(st){return "enc_"+st;});

    var newState = {};
    for (var i = 0; i < encNames.length; ++i){
      const name = encNames[i];
      const stat = encounterStats[i];
      newState[name] = stat;
    }
    this.setState(newState);
  };

  textChange = (event) => {
    var newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState);
  };

  render() {
    return (
      <div className="calc_grid">
        <AutoComplete floatingLabelText="Species"
                      fullWidth={true}
                      maxSearchResults={5}
                      filter={AutoComplete.caseInsensitiveFilter}
                      dataSource={getSpecies(this.props.data)}
                      onNewRequest={this.handleNewRequest}
                      searchText={this.state.speciesName}
                      onUpdateInput={this.handleUpdateInput}
                      onNewRequest={this.handleNewRequest}
                      style={{"gridArea": "spec"}}/>

        <TextField floatingLabelText="Level" id="level" className="level"
        onChange={this.textChange} value={this.state.level} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="HP" id="base_HP" className="base_HP"
        onChange={this.textChange} value={this.state.base_HP} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="Atk" id="base_ATK" className="base_ATK"
        onChange={this.textChange} value={this.state.base_ATK} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="Def" id="base_DEF" className="base_DEF"
        onChange={this.textChange} value={this.state.base_DEF} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="SpA" id="base_SPA" className="base_SPA"
        onChange={this.textChange} value={this.state.base_SPA} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="SpD" id="base_SPD" className="base_SPD"
        onChange={this.textChange} value={this.state.base_SPD} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="Spe" id="base_SPE" className="base_SPE"
        onChange={this.textChange} value={this.state.base_SPE} style={{width:"1fr"}}
        />

        <RaisedButton onClick={this.handleEncounter} label="Encounter:" className="encounter"/>

        <TextField floatingLabelText="HP" id="enc_HP"className="enc_HP"
        onChange={this.textChange} value={this.state.enc_HP} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="Atk" id="enc_ATK" className="enc_ATK"
        onChange={this.textChange} value={this.state.enc_ATK} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="Def" id="enc_DEF" className="enc_DEF"
        onChange={this.textChange} value={this.state.enc_DEF} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="SpA" id="enc_SPA" className="enc_SPA"
        onChange={this.textChange} value={this.state.enc_SPA} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="SpD" id="enc_SPD" className="enc_SPD"
        onChange={this.textChange} value={this.state.enc_SPD} style={{width:"1fr"}}
        />

        <TextField floatingLabelText="Spe" id="enc_SPE" className="enc_SPE"
        onChange={this.textChange} value={this.state.enc_SPE} style={{width:"1fr"}}
        />

      </div>
    );
  }
}
