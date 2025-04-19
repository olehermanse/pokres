import React from "react";
import { createRoot } from "react-dom/client";
import PokresApp from "./App.jsx";

const App = () => <PokresApp />;

const root = createRoot(document.getElementById("body_main"));
root.render(<App />);
