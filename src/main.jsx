import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import StatCalculator from './StatCalculator';
import AppBar from 'material-ui/AppBar';

function loadJSON(path, callback) {
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else {
              console.log("Error during GET");
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
    return xhr.onreadystatechange();
}

function renderUI(getData)
{
  const App = () => (
    <MuiThemeProvider>
      <div>
        <div className="nav_bar">
          <AppBar title="PokRes"/>
        </div>
        <StatCalculator data={getData}/>
      </div>
    </MuiThemeProvider>
  );

  ReactDOM.render(
    <App />,
    document.getElementById('body_main')
  );
}

document.body.style.overflow = "hidden";
renderUI(false);

(function data_init(){
  loadJSON("https://olehermanse.github.io/pokres/web/files/gen1.json",
           renderUI);
})();
