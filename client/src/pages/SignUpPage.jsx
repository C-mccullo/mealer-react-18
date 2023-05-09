import React from "react";
import SignUp from "../components/SignUp";

const SignUpPage = ({ signup, ...props }) => (
  <div>
    <SignUp signup={signup} />
  </div>
)

export default SignUpPage;