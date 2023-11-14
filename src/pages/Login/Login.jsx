import React from "react";
import LoginForm from "./components/Form";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <h1 className="heading">( Admin Panel )</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
