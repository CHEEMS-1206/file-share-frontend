// ContributorRoutes.js
import { Route, Routes, Navigate } from "react-router-dom";

import UploadNewFile from "../Contributors/UploadNewFile";
import ViewAllFilesContributors from "../Contributors/ViewAllFiles";
import ViewParticularFileDetails from "../ViewParticularFile/ViewParticularFile";
import DownloadHistoryContributors from "../Contributors/DonwloadHistory";
import UpdateFileDetails from "../Contributors/UpdateFileDetails";
import ContributorHome from "../Home/Homepage";
import ResetFilePassword from "../Contributors/ResetFilePassword";
import AboutMe from "../AboutMe/AboutMe";

function ContributorRoutes(props) {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ContributorHome
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/new-file"
        element={
          <UploadNewFile
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/my-files"
        element={
          <ViewAllFilesContributors
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/file/:file_id"
        element={
          <ViewParticularFileDetails
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/file-download-history"
        element={
          <DownloadHistoryContributors
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/update-file/:file_id"
        element={
          <UpdateFileDetails
            isLoggedIn={props.isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
            userType={props.userType}
          />
        }
      />
      <Route
        path="/reset-password/:file_id"
        element={
          <ResetFilePassword
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

export default ContributorRoutes;
