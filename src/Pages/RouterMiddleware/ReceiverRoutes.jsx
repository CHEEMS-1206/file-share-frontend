// ReceiverRoutes.js
import { Route, Routes, Navigate } from "react-router-dom";

import ReceiverHome from "../Home/Receivers/ReceiverHome";
import AllFiles from "../Home/Receivers/ViewAllFiles";
import AboutContributor from "../Home/Receivers/AboutContributor";
import DownloadHistory from "../Home/Receivers/DownloadHistory";
import ViewParticularFile from "../Home/Receivers/ViewParticularFile";
import AllContributors from "../Home/Receivers/AllContributorsDetails";

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
      <Route path="/all-files" element={<AllFiles />} />
      <Route
        path="/about-contributor/:contributor_id"
        element={<AboutContributor />}
      />
      <Route path="/download-file/:file_id" element={<DownloadHistory />} />
      <Route path="/my-download-history" element={<DownloadHistory />} />
      <Route path="/file/file_id" element={<ViewParticularFile />} />
      <Route path="/all-contributor" element={<AllContributors />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default ReceiverRoutes;
