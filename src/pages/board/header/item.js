import React from "react";

function Item({ title, body, footer }) {
  return (
    <div className="header-item">
      <span className="header-title">{title}</span>
      <span className="header-body">{body}</span>
      <span className="header-footer">{footer}</span>
    </div>
  );
}

export default Item;
