import React, { memo } from "react";
import "./styles.css";

function Loader({ text }) {
  return (
    <p className="loader">
      {text}
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </p>
  );
}

Loader.defaultProps = {
  text: "Loading"
};

export default memo(Loader);
