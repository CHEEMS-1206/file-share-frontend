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
} from "@mui/material";

function DownloadHistory(props) {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchDownloadHistory = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
      try {
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
      <div className="container tabs-container">
        <Typography
          variant="h4"
          gutterBottom
          style={{ margin: "30px 0px" }}
          className="login-reg-page-label-title"
        >
          Download History
        </Typography>
        {history.length === 0 ? (
          <Typography variant="body1" className="no-file-content">
            No files were downloaded yet!
          </Typography>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  {/* <TableCell>File Name</TableCell>
                  <TableCell>Contributor Name</TableCell>
                  <TableCell>Download Date</TableCell>
                  <TableCell>Download Time</TableCell> */}
                  <TableCell>File Download History:</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.map((record, index) => (
                  <TableRow key={record.record_id}>
                    <TableCell>
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
                    <TableCell>
                      {record.file_name} file contributed by{" "}
                      {record.contributor_name} was downloaded on{" "}
                      {new Date(record.downloaded_at).toLocaleDateString()} at{" "}
                      {new Date(record.downloaded_at).toLocaleTimeString()}.
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              count={Math.ceil(history.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </>
        )}
      </div>
    </>
  );
}

export default DownloadHistory;
