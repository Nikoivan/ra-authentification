import "./App.css";
import NetoSocial from "./components/NetoSocial/NetoSocial";

const baseUrl = "http://localhost:7070/";

function App() {
  return <NetoSocial baseUrl={baseUrl} />;
}

export default App;
