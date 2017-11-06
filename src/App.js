import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import StatCalculator from './StatCalculator';
import InfoPage from './InfoPage';

import g1 from '../web/files/gen1.mini.json';
import g2 from '../web/files/gen2-5.mini.json';
import g6 from '../web/files/gen6.mini.json';
import g7 from '../web/files/gen7.mini.json';

export default class PokresApp extends React.Component {
  state = {data: g1,
           open: false,
           title: "Generation 1"};

   handleToggle = () => this.setState({open: !this.state.open});
   handleClose = () => this.setState({open: false});

  gen1 = () => {
    this.setState({open: false, title: "Generation 1", data: g1});
  }

  gen25 = () => {
    this.setState({open: false, title: "Generation 2-5", data: g2});
  }

  gen6 = () => {
    this.setState({open: false, title: "Generation 6", data: g6});
  }
  gen7 = () => {
    this.setState({open: false, title: "Generation 7", data: g7});
  }
  info = () => {
    this.setState({open: false, title: "Information", data: null});
  }

  render() {
    var mainContent;
    if (this.state.data === null) {
      mainContent = <InfoPage />;
    } else {
      mainContent = <StatCalculator data={this.state.data}/>;
    }
    return (
      <div>
        <div className="nav_bar">
          <AppBar title={this.state.title}
          onLeftIconButtonTouchTap={this.handleToggle}
          />
        </div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.gen1}>Generation 1</MenuItem>
          <MenuItem onClick={this.gen25}>Generation 2-5</MenuItem>
          <MenuItem onClick={this.gen6}>Generation 6</MenuItem>
          <MenuItem onClick={this.gen7}>Generation 7</MenuItem>
          <MenuItem onClick={this.info}>Information</MenuItem>
        </Drawer>
        {mainContent}
      </div>
    );
  }
}
