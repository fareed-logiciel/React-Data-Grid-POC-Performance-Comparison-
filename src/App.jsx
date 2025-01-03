import AgGrid from "./Ag";
import MuiGrid from "./Mui";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <h1>React Data Grid POC (Performance Comparison)</h1>
      <MuiGrid />
      <AgGrid />
    </div>
  );
}

export default App;
