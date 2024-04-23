import React from "react";
import { useNavigate } from "react-router-dom";

import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";

import Header from "../../Components/Header";
import { Card, Button } from "react-bootstrap";

function ReceiverHome(props) {
  const navigate = useNavigate();
  const navigationHandler = (to) => {
    if (to === "af") navigate("/all-files");
    else if (to === "ac") navigate("/all-contributors");
    else if (to === "dh") navigate("/my-download-history");
    else navigate("/about-me");
  };
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container tabs-container py-4 ">
        <div>
          <BackupTableOutlinedIcon
            className="con-hom-icon"
            onClick={() => navigationHandler("af")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("af")}
          >
            All Files
          </Button>
        </div>
        <div>
          <GroupsOutlinedIcon
            className="con-hom-icon"
            onClick={() => navigationHandler("ac")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("ac")}
          >
            All Contributors
          </Button>
        </div>
        <div>
          <PermIdentityOutlinedIcon
            className="con-hom-icon"
            onClick={() => navigationHandler("am")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("am")}
          >
            About Me
          </Button>
        </div>
        <div>
          <RestorePageOutlinedIcon
            className="con-hom-icon"
            onClick={() => navigationHandler("dh")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("dh")}
          >
            Downoad History
          </Button>
        </div>
      </div>
    </>
  );
}
export default ReceiverHome;
