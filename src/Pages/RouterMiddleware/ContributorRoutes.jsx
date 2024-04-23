// ContributorRoutes.js
import { Route, Routes, Navigate } from "react-router-dom";

import UploadNewFile from "../Home/Contributors/UploadNewFile";
import ViewAllFilesContributors from "../Home/Contributors/ViewAllFiles";
import ViewParticularFileDetails from "../Home/Contributors/ViewParticularFile";
import DownloadHistoryContributors from "../Home/Contributors/DonwloadHistory";
import UpdateFileDetails from "../Home/Contributors/UpdateFileDetails";
import ContributorHome from "../Home/Contributors/ContributorHome";
import ResetFilePassword from "../Home/Contributors/ResetFilePassword";

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
      <Route path="/new-file" element={<UploadNewFile />} />
      <Route path="/my-files" element={<ViewAllFilesContributors />} />
      <Route path="/file/:file_id" element={<ViewParticularFileDetails />} />
      <Route
        path="/file-download-history"
        element={<DownloadHistoryContributors />}
      />
      <Route path="/update-file/:file_id" element={<UpdateFileDetails />} />
      <Route path="/reset-password/:file_id" element={<ResetFilePassword />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default ContributorRoutes;
