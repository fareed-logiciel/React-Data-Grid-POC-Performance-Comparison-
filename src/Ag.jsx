import { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // For AG Grid
import "ag-grid-community/styles/ag-grid.css"; // AG Grid styles
import "ag-grid-community/styles/ag-theme-alpine.css"; // AG Grid theme
import {
  ModuleRegistry,
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
  provideGlobalGridOptions,
} from "ag-grid-community";
import { generateData, INTERVAL, UPDATE_COUNT } from "./utils";

ModuleRegistry.registerModules([
  ClientSideRowModelApiModule,
  ClientSideRowModelModule,
  ValidationModule,
  PaginationModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

const AgGrid = () => {
  const agGridRef = useRef();
  const [rows] = useState(generateData(100000)); // 100,000 rows

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      const rows = agGridRef?.current?.props?.rowData;
      for (let i = 0; i < UPDATE_COUNT; i++) {
        const element = rows[i];
        rows[i] = {
          ...element,
          price: (Math.random() * 1000).toFixed(2), // Update price
          ask: (Math.random() * 100).toFixed(2), // Update price
          bid: (Math.random() * 100).toFixed(2), // Update price
          last: (Math.random() * 100).toFixed(2), // Update price
        };
      }
      agGridRef.current?.api?.applyTransactionAsync({ update: rows });
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const getRowId = useCallback((params) => String(params.data.id), []);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "1000px", marginBottom: 80 }}
    >
      <h2>AG Grid Enterprise</h2>
      <AgGridReact
        ref={agGridRef}
        getRowId={getRowId}
        rowData={rows}
        columnDefs={[
          {
            field: "id",
            headerName: "ID",
            sortable: true,
            filter: true,
          },
          {
            field: "symbol",
            headerName: "Symbol",
            sortable: true,
            filter: true,
          },
          {
            field: "price",
            headerName: "Price",
            sortable: true,
            filter: true,
          },
          {
            field: "volume",
            headerName: "Volume",
            sortable: true,
            filter: true,
          },
          {
            field: "bid",
            headerName: "Bid",
            sortable: true,
            filter: true,
          },
          {
            field: "ask",
            headerName: "Ask",
            sortable: true,
            filter: true,
          },
          {
            field: "last",
            headerName: "Last",
            sortable: true,
            filter: true,
          },
        ]}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        rowHeight={40}
        pagination={false}
        asyncTransactionWaitMillis={0}
      />
    </div>
  );
};

export default AgGrid;
