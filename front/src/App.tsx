import { useState } from "react";
import "./App.css";
import NetoSocial from "./components/NetoSocial/NetoSocial";
import Context from "./services/Context";

const baseUrl = "http://localhost:7070/";

export type LoginProps =
  | {
      id: string;
      login: string;
      name: string;
      avatar: string;
    }
  | undefined;

export type TokenProps = string | undefined;

function App() {
  const [login, setLogin] = useState<LoginProps>();
  const [token, setToken] = useState<TokenProps>();

  const logout = () => {
    setToken(undefined);
    setLogin(undefined);
    window.localStorage.removeItem("token");
  };

  return (
    <Context.Provider value={{ login, setLogin, token, setToken, logout }}>
      <NetoSocial baseUrl={baseUrl} />
    </Context.Provider>
  );
}

export default App;
