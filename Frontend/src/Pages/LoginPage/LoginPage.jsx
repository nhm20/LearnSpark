import React from "react";
import Image from "./Image";
import Login from "./Login";
const LoginPage = () => {
  return (
    <>
      <div className="flex flex-row align-center justify-center">
        <Login />
        <Image />
      </div>
    </>
  );
};

export default LoginPage;
