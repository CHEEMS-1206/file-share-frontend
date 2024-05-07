import React from "react";
import { useNavigate } from "react-router-dom";

import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import BackupTableOutlinedIcon from "@mui/icons-material/BackupTableOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import RestorePageOutlinedIcon from "@mui/icons-material/RestorePageOutlined";

import Header from "../Components/Header";
import { Button } from "react-bootstrap";

function Homepage(props) {
  const navigate = useNavigate();

  const navigationHandler = (to) => {
    if (to === "af") navigate("/all-files");
    else if (to === "ac") navigate("/all-contributors");
    else if (to === "dh") navigate("/my-download-history");
    else if(to === "am") navigate("/about-me");

    if (to === "mf") navigate("/my-files");
    else if (to === "anf") navigate("/new-file");
    else if (to === "fdh") navigate("/file-download-history");
    else if (to === "am") navigate("/about-me");
  };
  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      {props.userType === "Contributor" ? (
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
      ) : (
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
      )}
    </>
  );
}
export default Homepage;
