import React from "react";

import Header from "../Components/Header";
import { Card, Button } from "react-bootstrap";

function DownloadFile(props) {
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container">download file</div>
    </>
  );
}
export default DownloadFile;