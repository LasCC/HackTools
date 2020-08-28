import React from "react";
import { BackTop } from "antd";
import LayoutApp from "./components/LayoutApp.js";
import "./assets/css/style.css";
import ReactDOM from "react-dom";
import { Router } from "react-chrome-extension-router";

import ReverseShell from "./components/ReverseShell.js";

function App() {
  return (
    <div>
      <ReverseShell />
    </div>
  );
}

ReactDOM.render(
  <LayoutApp>
    <Router>
      <App />
    </Router>
    <BackTop />
  </LayoutApp>,
  document.getElementById("app")
);
