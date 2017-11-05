import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';

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
           "base_HP":  "",
           "base_ATK": "",
           "base_DEF": "",
           "base_SPA": "",
           "base_SPD": "",
           "base_SPE": ""};

  handleUpdateInput = (speciesName) => {
    this.setState({
      speciesName: speciesName,
    });
  };

  handleNewRequest = () => {
    this.setState(getStats(this.state.speciesName, this.props.data));
  };

  textChange = (event) => {
    var newState = {}
    newState[event.target.id] = event.target.value
    this.setState(newState);
  };

  render() {
    return (
      <div className="calc_grid">
        <AutoComplete hintText="Species"
                      fullWidth={true}
                      maxSearchResults={5}
                      filter={AutoComplete.caseInsensitiveFilter}
                      dataSource={getSpecies(this.props.data)}
                      onNewRequest={this.handleNewRequest}
                      searchText={this.state.speciesName}
                      onUpdateInput={this.handleUpdateInput}
                      onNewRequest={this.handleNewRequest}
                      style={{"gridArea": "spec"}}/>

        <TextField id="base_HP" hintText="HP" className="base_HP"
        onChange={this.textChange} value={this.state.base_HP} style={{width:"1fr"}}
        />

        <TextField id="base_ATK" hintText="Atk"  className="base_ATK"
        onChange={this.textChange} value={this.state.base_ATK} style={{width:"1fr"}}
        />

        <TextField id="base_DEF" hintText="Def"  className="base_DEF"
        onChange={this.textChange} value={this.state.base_DEF} style={{width:"1fr"}}
        />

        <TextField id="base_SPA" hintText="SpA"  className="base_SPA"
        onChange={this.textChange} value={this.state.base_SPA} style={{width:"1fr"}}
        />

        <TextField id="base_SPD" hintText="SpD"  className="base_SPD"
        onChange={this.textChange} value={this.state.base_SPD} style={{width:"1fr"}}
        />

        <TextField id="base_SPE" hintText="Spe"  className="base_SPE"
        onChange={this.textChange} value={this.state.base_SPE} style={{width:"1fr"}}
        />

        <RaisedButton label="Calculate" className="calc_range"/>
      </div>
    );
  }
}
