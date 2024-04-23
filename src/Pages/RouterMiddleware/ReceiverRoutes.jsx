// ReceiverRoutes.js
import { Route, Routes, Navigate } from "react-router-dom";

import ReceiverHome from "../Home/Receivers/ReceiverHome";
import AllFiles from "../Home/Receivers/ViewAllFiles";
import AboutContributor from "../Home/Receivers/AboutContributor";
import DownloadHistory from "../Home/Receivers/DownloadHistory";
import ViewParticularFile from "../Home/Receivers/ViewParticularFile";
import AllContributors from "../Home/Receivers/AllContributorsDetails";
import AboutMeReceiver from "../Home/Receivers/AboutMe";

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
        path="/file/file_id"
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
          <AboutMeReceiver
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
