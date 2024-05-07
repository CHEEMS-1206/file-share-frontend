import React from "react";

import Header from "../Components/Header";
import { Card, Button } from "react-bootstrap";

function DownloadHistoryContributors(props) {
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container tabs-container">download file history</div>
    </>
  );
}
export default DownloadHistoryContributors;
