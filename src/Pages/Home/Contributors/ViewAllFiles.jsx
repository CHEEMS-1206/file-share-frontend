import React from "react";

import Header from "../../Components/Header";
import { Card, Button } from "react-bootstrap";

function ViewAllFilesContributors(props) {
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container tabs-container">
        files
      </div>
    </>
  );
}
export default ViewAllFilesContributors;
