import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ColDef } from "ag-grid-community";

const GridExample = () => {
  const [rowData, setRowData] = useState<any[]>([
    { id: 'c1', make: 'Toyota', model: 'Celica', price: 35000 },
    { id: 'c2', make: 'Ford', model: 'Mondeo', price: 32000 },
    { id: 'c8', make: 'Porsche', model: 'Boxster', price: 72000 },
    { id: 'c4', make: 'BMW', model: 'M50', price: 60000 },
    { id: 'c14', make: 'Aston Martin', model: 'DBX', price: 190000 },
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "id", suppressMenu: true, resizable: false },
    { field: "make", suppressMenu: true, resizable: false },
    { field: "model", suppressMenu: true, resizable: false },
    { field: "price", suppressMenu: true, resizable: false },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%",
        }}
        className="ag-theme-alpine"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default GridExample;