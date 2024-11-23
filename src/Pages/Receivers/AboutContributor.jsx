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
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";

function AboutContributor(props) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [files, setFiles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const { contributor_id } = useParams();

  useEffect(() => {
    fetchUserDetails();
    if (showAllFiles) {
      fetchFiles();
    }
  }, [showAllFiles]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/receiver/about-contributor/${contributor_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
      } else {
        console.error("Failed to fetch User Details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/receiver/contributor/files/${contributor_id}`,
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
        console.error("Failed to fetch Files:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSeeAllFiles = () => {
    setShowAllFiles(true);
  };

  const handleViewDetails = (fileId) => {
    navigate(`/file/${fileId}`);
  };

  const handleDownload = (e, fileId, file_title) => {
    e.stopPropagation();
    navigate(`/download-file/${fileId}/${file_title}`);
  };

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <div className="container">
        {/* <Typography
          variant="h5"
          style={{ margin: "30px 0px" }}
          className="login-reg-page-label-title"
        >
          About Contributor
        </Typography> */}
        <div className="file-table-container about-details-container">
          {userDetails && !showAllFiles ? (
            <form>
              <div className="user-profile-container">
                <img
                  id="userProfilePic"
                  src={userDetails.user_profile_pic}
                  alt="profilepic"
                />
              </div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    value={userDetails.user_name}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Username"
                    value={userDetails.user_username}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Email ID"
                    value={userDetails.user_email}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Contact Num."
                    value={userDetails.user_phone_no}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSeeAllFiles}
                    style={{ marginTop: "20px" }}
                  >
                    See All Files
                  </Button>
                </Grid>
              </Grid>
            </form>
          ) : null}
          {showAllFiles ? (
            <>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-title">Sr. No.</TableCell>
                    <TableCell className="table-title">Title</TableCell>
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
                        onClick={() => handleViewDetails(file.file_id)}
                      >
                        <TableCell style={{ color: "#1421DC" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell
                          style={{ color: "crimson", cursor: "pointer" }}
                        >
                          {file.file_title}
                        </TableCell>
                        <TableCell style={{ color: "#1421DC" }}>
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
            </>
          ) : null}
        </div>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          className="pagination"
          style={{ marginTop: "20px" }}
        />
      </div>
    </>
  );
}

export default AboutContributor;
