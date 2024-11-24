import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { toast } from "react-toastify";

import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@mui/material";

import Header from "../Components/Header";
import LoaderSpinner from "../Components/Loader";

function DownloadHistory(props) {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useEffect(false);

  useEffect(() => {
    const fetchDownloadHistory = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5001/api/receiver/my-download-history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching download history:", error);
        toast.error("Some error occurred try re logging in.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloadHistory();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedHistory = history.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleViewContributorDetails = (e, contributorId) => {
    e.stopPropagation();
    navigate(`/about-contributor/${contributorId}`);
    console.log("moved");
  };

  console.log(history);

  return isLoading ? (
    <div>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <LoaderSpinner />
    </div>
  ) : (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container">
        {/* <Typography
          variant="h4"
          gutterBottom
          style={{ margin: "30px 0px" }}
          className="login-reg-page-label-title"
        >
          Download History
        </Typography> */}
        {history.length === 0 ? (
          <Typography variant="body1" className="no-file-content">
            No files were downloaded yet!
          </Typography>
        ) : (
          <>
            <div className="file-table-container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: "#1421DC" }}>Sr. No.</TableCell>
                    {/* <TableCell>File Name</TableCell>
                  <TableCell>Contributor Name</TableCell>
                  <TableCell>Download Date</TableCell>
                  <TableCell>Download Time</TableCell> */}
                    <TableCell style={{ color: "#1421DC" }}>
                      File Download History:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedHistory.map((record, index) => (
                    <TableRow key={record.record_id}>
                      <TableCell style={{ color: "#1421DC" }}>
                        {(page - 1) * rowsPerPage + index + 1}
                      </TableCell>
                      {/* <TableCell>{record.file_name}</TableCell>
                    <TableCell>{record.contributor_name}</TableCell>
                    <TableCell>
                      {new Date(record.downloaded_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(record.downloaded_at).toLocaleTimeString()}
                    </TableCell> */}
                      <TableCell style={{ color: "crimson" }}>
                        {record.file_name} file contributed by{" "}
                        <span
                          style={{ cursor: "pointer", color: "#1421DC" }}
                          onClick={(e) =>
                            handleViewContributorDetails(
                              e,
                              record.contributor_id
                            )
                          }
                        >
                          {record.contributor_name}
                        </span>{" "}
                        was downloaded on{" "}
                        {new Date(record.downloaded_at).toLocaleDateString()} at{" "}
                        {new Date(record.downloaded_at).toLocaleTimeString()}.
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Pagination
              count={Math.ceil(history.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
              className="pagination"
            />
          </>
        )}
      </div>
    </>
  );
}

export default DownloadHistory;
