import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import PokresApp from "./App";

const App = () => (
  <MuiThemeProvider>
    <PokresApp />
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("body_main"));

//document.body.style.overflow = "hidden";
