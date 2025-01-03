/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { DataGridPremium, useGridApiRef } from "@mui/x-data-grid-premium"; // For MUI Data Grid Premium
import { generateData, INTERVAL, UPDATE_COUNT } from "./utils";

const MuiGrid = () => {
  const apiRef = useGridApiRef();
  const [rows] = useState(generateData(100000)); // 100,000 rows

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      const rows = Array.from(apiRef.current.getRowModels().values());
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
      apiRef.current?.updateRows(rows);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "1000px", marginBottom: 80 }}>
      <h2>MUI Data Grid Premium</h2>
      <DataGridPremium
        rows={rows}
        apiRef={apiRef}
        pagination={false} // Disable pagination
        columns={[
          { field: "id", headerName: "ID", width: 100 },
          { field: "symbol", headerName: "Symbol", width: 150 },
          { field: "price", headerName: "Price", width: 150 },
          { field: "volume", headerName: "Volume", width: 150 },
          { field: "bid", headerName: "Bid", width: 150 },
          { field: "ask", headerName: "Ask", width: 150 },
          { field: "last", headerName: "Last", width: 150 },
        ]}
        rowHeight={40}
        getRowId={(row) => row.id}
        hideFooter
      />
    </div>
  );
};

export default MuiGrid;
