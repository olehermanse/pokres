import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import StatCalculator from "./StatCalculator.jsx";
import InfoPage from "./InfoPage.jsx";

import g1 from "../res/json/gen1.mini.json";
import g25 from "../res/json/gen2-5.mini.json";
import g6 from "../res/json/gen6.mini.json";
import g7 from "../res/json/gen7.mini.json";
import g8 from "../res/json/gen8.mini.json";
import g9 from "../res/json/gen9.mini.json";

function getData(gen) {
  if (gen === "1") {
    return g1;
  }
  if (gen === "6") {
    return g6;
  }
  if (gen === "7") {
    return g7;
  }
  if (gen === "8") {
    return g8;
  }
  if (gen === "9") {
    return g9;
  }
  return g25;
}

export default function PokresApp() {
  const [view, setView] = React.useState("default");
  const [generation, setGeneration] = React.useState("1");

  const gen1 = () => {
    setView("default");
    setGeneration("1");
  };

  const gen2 = () => {
    setView("default");
    setGeneration("2");
  };

  const gen3 = () => {
    setView("default");
    setGeneration("3");
  };

  const gen4 = () => {
    setView("default");
    setGeneration("4");
  };

  const gen5 = () => {
    setView("default");
    setGeneration("5");
  };

  const gen6 = () => {
    setView("default");
    setGeneration("6");
  };

  const gen7 = () => {
    setView("default");
    setGeneration("7");
  };

  const gen8 = () => {
    setView("default");
    setGeneration("8");
  };

  const gen9 = () => {
    setView("default");
    setGeneration("9");
  };

  const info = () => {
    setView("info");
  };

  let mainContent;
  if (view === "info") {
    mainContent = <InfoPage />;
  } else {
    mainContent = (
      <StatCalculator data={getData(generation)} generation={generation} />
    );
  }
  return (
    <div>
      <div className="nav_bar">
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                if (view === "default") {
                  setView("drawer");
                } else {
                  setView("default");
                }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box>PokRes</Box>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer
        onClose={() => {
          setView("default");
        }}
        open={view === "drawer"}
      >
        <MenuItem onClick={gen1}>Generation 1</MenuItem>
        <MenuItem onClick={gen2}>Generation 2</MenuItem>
        <MenuItem onClick={gen3}>Generation 3</MenuItem>
        <MenuItem onClick={gen4}>Generation 4</MenuItem>
        <MenuItem onClick={gen5}>Generation 5</MenuItem>
        <MenuItem onClick={gen6}>Generation 6</MenuItem>
        <MenuItem onClick={gen7}>Generation 7</MenuItem>
        <MenuItem onClick={gen8}>Generation 8</MenuItem>
        <MenuItem onClick={gen9}>Generation 9</MenuItem>
        <MenuItem onClick={info}>Information</MenuItem>
      </Drawer>
      {mainContent}
    </div>
  );
}
