import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from "@mui/material";

function DownloadHistoryContributors(props) {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDownloadHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5001/api/contributor/my-file-downloads",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching download history:", error);
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

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container">
        <Typography
          variant="h4"
          gutterBottom
          style={{ margin: "30px 0px" }}
          className="login-reg-page-label-title"
        >
          File's Download History
        </Typography>
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
                    <TableCell>Downloader Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell> */}
                    <TableCell style={{ color: "#1421DC" }}>
                      Download details:
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedHistory.map((record, index) => (
                    <TableRow key={record.record_id}>
                      <TableCell style={{ color: "#1421DC" }}>
                        {(page - 1) * rowsPerPage + index + 1}
                      </TableCell>
                      {/* <TableCell>{record.file_title}</TableCell>
                      <TableCell>{record.downloader_name}</TableCell>
                      <TableCell>
                        {new Date(record.downloaded_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(record.downloaded_at).toLocaleTimeString()}
                      </TableCell> */}
                      <TableCell style={{ color: "crimson" }}>
                        {record.file_title} file was downloaded by{" "}
                        <span style={{ cursor: "pointer", color: "#1421DC" }}>
                          {record.downloader_name}
                        </span>{" "}
                        on {new Date(record.downloaded_at).toLocaleDateString()}{" "}
                        at {new Date(record.downloaded_at).toLocaleTimeString()}
                        .
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
              size="large"
              className="pagination"
            />
          </>
        )}
      </div>
    </>
  );
}

export default DownloadHistoryContributors;
