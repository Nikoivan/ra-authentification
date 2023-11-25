import { useContext } from "react";
import Context, { ContextTypeProps } from "../../services/Context";
import imgUrl from "../../assets/images/man-2_icon-icons.com_55041.png";

import "./Login.css";

export default function Login() {
  const { login, logout } = useContext<ContextTypeProps>(Context);

  return (
    <div className="Login">
      <span className="Login-Title">Hello, {login?.name}</span>
      <img className="Login-Image" src={imgUrl} alt="Login" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="Login-Form"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
          className="Form-Button"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
