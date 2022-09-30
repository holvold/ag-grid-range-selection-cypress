import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GridExample from "./RangeSelection/poc";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

ReactDOM.render(
  <React.StrictMode>
    <GridExample />
  </React.StrictMode>,
  document.getElementById("root")
);
