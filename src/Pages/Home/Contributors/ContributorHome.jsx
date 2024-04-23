import React from "react";
import { useNavigate } from "react-router-dom";

import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";

import Header from "../../Components/Header";
import { Card, Button } from "react-bootstrap";

function ContributorHome(props) {
  const navigate = useNavigate();
  const navigationHandler = (to) => {
    if (to === "mf") navigate("/my-files");
    else if (to === "anf") navigate("/new-file");
    else if (to === "fdh") navigate("/file-download-history");
    else navigate("/about-me");
  };
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <div className="container tabs-container">
        <div>
          <FilePresentOutlinedIcon
            className="con-hom-icon"
            onClick={() => navigationHandler("mf")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("mf")}
          >
            My Files
          </Button>
        </div>
        <div>
          <NoteAddOutlinedIcon
            className="con-hom-icon"
            onClick={() => navigationHandler("anf")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("anf")}
          >
            Add New File
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
            onClick={() => navigationHandler("fdh")}
          />
          <Button
            className="con-hom-btn"
            onClick={() => navigationHandler("fdh")}
          >
            File History
          </Button>
        </div>
      </div>
    </>
  );
}
export default ContributorHome;
