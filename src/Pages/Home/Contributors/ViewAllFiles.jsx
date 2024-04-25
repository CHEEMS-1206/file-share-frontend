import React, { useState, useEffect } from "react";
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

import Header from "../../Components/Header";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { useNavigate } from "react-router-dom";

function ViewAllFilesContributors(props) {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch files from the server
  const fetchFiles = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/contributor/my-files",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
        setTotalPages(Math.ceil(data.length / 10));
      } else {
        console.error("Failed to fetch files:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleRowClick = (fileId) => {
    navigate(`/file/${fileId}`);
  };

  const handleDeleteButtonClick = async (e, fileId) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:5001/api/contributor/my-file/${fileId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        console.log(`File with ID ${fileId} deleted successfully.`);
        // Refresh the files list after deletion
        fetchFiles();
      } else {
        console.error(
          `Failed to delete file with ID ${fileId}:`,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleUpdatePasswordButtonClick = (e, fileId) => {
    e.stopPropagation();
    navigate(`/reset-password/${fileId}`);
  };

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <div className="container">
        <div className="file-table-container">
          {files.length > 0 ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-title">Sr. No.</TableCell>
                    <TableCell className="table-title">File Title</TableCell>
                    <TableCell className="table-title">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files
                    .slice((page - 1) * 10, page * 10)
                    .map((file, index) => (
                      <TableRow
                        key={(page - 1) * 10 + index + 1}
                        onClick={() => handleRowClick(file.file_id)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                        <TableCell>{file.file_title}</TableCell>
                        <TableCell style={{ width: "max-content" }}>
                          <Tooltip title="Change File Password">
                            <PasswordOutlinedIcon
                              className="dele-cngpswd-btn"
                              onClick={(e) =>
                                handleUpdatePasswordButtonClick(e, file.file_id)
                              }
                            />
                          </Tooltip>
                          <Tooltip title="Delete File">
                            <DeleteOutlineOutlinedIcon
                              title="Delete File"
                              className="dele-cngpswd-btn"
                              onClick={(e) =>
                                handleDeleteButtonClick(e, file.file_id)
                              }
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <Typography className="no-file-content">No Files</Typography>
          )}
        </div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          className="pagination"
        />
      </div>
    </>
  );
}

export default ViewAllFilesContributors;
