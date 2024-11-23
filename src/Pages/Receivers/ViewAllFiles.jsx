import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
  Tooltip,
} from "@mui/material";

import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";

import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

import { toast } from "react-toastify";

function AllFiles(props) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/receiver/all-files",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const filesData = await response.json();
        setFiles(filesData);
        setTotalPages(Math.ceil(filesData.length / 10));
      } else {
        toast.error("Failed to fetch files.")
        console.error("Failed to fetch files");
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast.error("Some error occurred try re logging in.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewDetails = (fileId) => {
    navigate(`/file/${fileId}`);
  };

  const handleDownload = (e, fileId, file_title) => {
    e.stopPropagation();
    navigate(`/download-file/${fileId}/${file_title}`);
  };

  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <div className="container">
        {files.length > 0 ? (
          <>
            <div className="file-table-container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-title">Sr.</TableCell>
                    <TableCell className="table-title">Title</TableCell>
                    {window.innerWidth > 770 ? (
                      <TableCell className="table-title">Uploaded At</TableCell>
                    ) : (
                      <></>
                    )}
                    <TableCell className="table-title">Downloads</TableCell>
                    <TableCell className="table-title">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files
                    .slice((page - 1) * 10, page * 10)
                    .map((file, index) => (
                      <TableRow
                        key={file.file_id}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleViewDetails(file.file_id)}
                      >
                        <TableCell style={{ color: "#1421DC" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ color: "crimson" }}>
                          {file.file_title}
                        </TableCell>
                        {window.innerWidth > 770 ? (
                          <TableCell style={{ color: "#1421DC" }}>
                            {formatDate(file.uploaded_at)}
                          </TableCell>
                        ) : (
                          <></>
                        )}
                        <TableCell
                          style={{ paddingLeft: "20px", color: "#1421DC" }}
                        >
                          {file.download_count}
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Download File">
                            <Button
                              color="primary"
                              startIcon={<GetAppOutlinedIcon />}
                              onClick={(e) =>
                                handleDownload(e, file.file_id, file.file_title)
                              }
                            ></Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              className="pagination"
            />
          </>
        ) : (
          <Typography className="no-file-content">No Files to show.</Typography>
        )}
      </div>
    </>
  );
}

export default AllFiles;
