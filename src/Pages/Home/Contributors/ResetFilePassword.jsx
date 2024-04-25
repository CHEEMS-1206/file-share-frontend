import React from "react";

import Header from "../../Components/Header";
import { Card, Button } from "react-bootstrap";

function ResetFilePassword(props) {
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container tabs-container"> Reset file password for file having id --- </div>
    </>
  );
}
export default ResetFilePassword;
