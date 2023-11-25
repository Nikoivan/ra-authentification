import { PropsWithChildren } from "react";

import "./NetoHeader.css";

const NetoHeader = ({ children }: PropsWithChildren) => {
  return (
    <header className="Neto-Header">
      <div className="Neto-Logo">
        <h1 className="Neto-Title">Neto Social</h1>
      </div>
      {children}
    </header>
  );
};

export default NetoHeader;
