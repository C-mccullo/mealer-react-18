import React from "react";
import Login from "../components/Login";


const LoginRoute = (props) => (
  <div>
    <Login login={ props.login }/>
  </div>
)

export default LoginRoute