import React from "react";
import "./styles.css";

function LoginPage({ history }) {
  const handleLogin = e => {
    e.preventDefault();
    history.push("board");
  };
  return (
    <div className="wrapper">
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={handleLogin}>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
