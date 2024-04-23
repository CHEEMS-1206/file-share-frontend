import React from "react";

import Header from "../../Components/Header";
import { Card, Button } from "react-bootstrap";

function AboutMeContributor(props) {
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container tabs-container">about me (c) </div>
    </>
  );
}
export default AboutMeContributor;
