import { useState } from "react";

import { AgGridReact, AgGridColumn } from "ag-grid-react";
import SquareComponent from "./SquareComponent";
import {
  CellClassRules,
  CellClickedEvent,
  CellRange,
  ColumnApi,
  GetContextMenuItemsParams,
  GridApi,
  GridReadyEvent,
  MenuItemDef,
} from "ag-grid-community";

const rowStyle = {
  outerHeight: 40,
  innerHeight: 28,
};

interface Week {
  TeamName: string
  id: string;
  MO: boolean;
  TU: boolean;
  WE: boolean;
  TH: boolean;
  FR: boolean;
}

const App = () => {
  const initialRowData: Week[] = [
    { TeamName: "F1 Team", id: "tech1", MO: false, TU: false, WE: false, TH: false, FR: false },
    { TeamName: "F1 Team", id: "tech2", MO: false, TU: false, WE: false, TH: false, FR: false },
    { TeamName: "F1 Team", id: "tech3", MO: false, TU: false, WE: false, TH: false, FR: false },
    { TeamName: "F1 Team", id: "tech4", MO: false, TU: false, WE: false, TH: false, FR: false },
    { TeamName: "F1 Team", id: "tech5", MO: false, TU: false, WE: false, TH: false, FR: false },
    { TeamName: "F1 Team", id: "tech6", MO: false, TU: false, WE: false, TH: false, FR: false },
    { TeamName: "F1 Team", id: "tech7", MO: false, TU: false, WE: false, TH: false, FR: false },
  ];

  const [gridApi, setGridApi] = useState<GridApi>();
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
  const [rowData, setRowData] = useState<Week[]>(initialRowData);

  const numbers = [1, 2, 3, 4, 5];

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const ddShiftRules: CellClassRules = {
    grey: (params) => params.value === false,
    green: (params) => params.value === true,
  };

  const getShiftsMenu = (params: GetContextMenuItemsParams) => {
    const menuItems: MenuItemDef[] = [
      {
        name: "Day shift",
        shortcut: "07:00-17:00",
        action: () => {
          selectRanges(params.api, rowData);
          params.api.clearRangeSelection();
        },
      },

      {
        name: "Night shift",
        shortcut: "15:00-23:00",
        action: () => {
          selectRanges(params.api, rowData);
          params.api.clearRangeSelection();
        },
      },
    ];

    return menuItems;
  };

  const selectRanges = (gridApi: GridApi | undefined, rowData: Week[]) => {
    const selectedRanges = gridApi?.getCellRanges();
    console.log("samrat range", selectedRanges);

    selectedRanges?.forEach((range) =>
      highlightSelectedRange(range, gridApi, rowData)
    );
  };

  const highlightSelectedRange = (
    range: CellRange,
    gridApi: GridApi | undefined,
    rowData: Week[]
  ) => {
    const startRowIndex: number = range.startRow?.rowIndex || 0;
    const endRowIndex: number = range.endRow?.rowIndex || 0;

    range.columns.forEach((column) => {
      for (let i = startRowIndex; i <= endRowIndex; i++) {
        let clickedRow = gridApi?.getRowNode(rowData[i].id);
        clickedRow?.setDataValue(column, true);
      }
    });
  };

  const handleCellClick = (event: CellClickedEvent) => {
    if (event.value) {
      event.node.setDataValue(event.column, false);
    }
  };

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
          getContextMenuItems={getShiftsMenu}
          getRowNodeId={(data: Week) => data.id}
          frameworkComponents={{
            squareRenderer: SquareComponent,
          }}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
          }}
          autoGroupColumnDef={{
            headerName: "Athlete",
            field: "athlete",
            minWidth: 250,
            cellRenderer: "agGroupCellRenderer",
            cellRendererParams: { checkbox: true },
          }}
          rowSelection={"multiple"}
          groupSelectsChildren={true}
          suppressRowClickSelection={true}
          suppressAggFuncInHeader={true}
          onGridReady={onGridReady}
          rowData={rowData}
          rowStyle={rowStyle}
          enableRangeSelection={true}
          onCellClicked={handleCellClick}
        >
          <AgGridColumn field="id" maxWidth={120} />
          {/*<AgGridColumn field="date" maxWidth={150} />

          <AgGridColumn
            maxWidth={100}
            cellRenderer="squareRenderer"
            field="gold"
          />
          <AgGridColumn
            maxWidth={100}
            cellRenderer="squareRenderer"
            field="silver"
          /> */}

          {/* <AgGridColumn
            maxWidth={100}
            cellRenderer="squareRenderer"
            field="MO"
          />

          <AgGridColumn
            maxWidth={100}
            cellRenderer="squareRenderer"
            field="TU"
          />
          <AgGridColumn
            maxWidth={100}
            cellRenderer="squareRenderer"
            field="WE"
            onCellClicked={handleCellClicked}
          /> */}

          <AgGridColumn
            maxWidth={40}
            field="MO"
            valueFormatter={() => ""}
            cellClass="DDBox"
            cellClassRules={ddShiftRules}
          />
          <AgGridColumn
            maxWidth={40}
            field="TU"
            valueFormatter={() => ""}
            cellClass="DDBox"
            cellClassRules={ddShiftRules}
          />
          <AgGridColumn
            maxWidth={40}
            field="WE"
            valueFormatter={() => ""}
            cellClass="DDBox"
            cellClassRules={ddShiftRules}
          />
          <AgGridColumn
            maxWidth={40}
            field="TH"
            valueFormatter={() => ""}
            cellClass="DDBox"
            cellClassRules={ddShiftRules}
          />
          <AgGridColumn
            maxWidth={40}
            field="FR"
            valueFormatter={() => ""}
            cellClass="DDBox"
            cellClassRules={ddShiftRules}
          />
        </AgGridReact>
        <button></button>
      </div>
    </div>
  );
};

export default App;
