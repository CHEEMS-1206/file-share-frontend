// ReceiverRoutes.js
import { Route, Routes, Navigate } from "react-router-dom";

import ReceiverHome from "../Home/Homepage";
import AllFiles from "../Receivers/ViewAllFiles";
import DownloadHistory from "../Receivers/DownloadHistory";
import ViewParticularFile from "../ViewParticularFile/ViewParticularFile";
import AllContributors from "../Receivers/AllContributorsDetails";
import AboutMe from "../AboutMe/AboutMe";

function ReceiverRoutes(props) {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ReceiverHome
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/all-files"
        element={
          <AllFiles
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/about-contributor/:contributor_id"
        element={
          <AboutContributor
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/download-file/:file_id"
        element={
          <DownloadHistory
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/my-download-history"
        element={
          <DownloadHistory
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/file/:file_id"
        element={
          <ViewParticularFile
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/all-contributors"
        element={
          <AllContributors
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/about-me"
        element={
          <AboutMe
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default ReceiverRoutes;
