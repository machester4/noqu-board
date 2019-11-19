import React from "react";
import "./styles.css";

// Components
import Item from "./item";

function Header() {
  return (
    <div className="header">
      <Item title="Version" body="0.0.1" footer="Redis 5.0.1" />
      <Item title="CPU Usage" body="0.3%" />
      <Item title="Memory Usage" body="0.3%" footer="30 KB of 4 GB" />
      <Item title="Active" body="8" />
      <Item title="Waiting" body="3" />
    </div>
  );
}

export default Header;
