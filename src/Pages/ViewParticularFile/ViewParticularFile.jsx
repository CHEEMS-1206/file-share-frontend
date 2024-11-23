import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Typography, TextField, Grid, Tooltip, Button } from "@mui/material";

import Header from "../Components/Header";

import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";

import { useNavigate } from "react-router-dom";

function ViewParticularFileDetails(props) {
  const navigate = useNavigate();
  const { file_id } = useParams();
  const [fileDetails, setFileDetails] = useState(null);

  useEffect(() => {
    const fetchFileDetails = async () => {
      const uri =
        props.userType === "Contributor"
          ? `contributor/my-file/${file_id}`
          : `receiver/file/${file_id}`;

      try {
        const response = await fetch(`http://localhost:5001/api/${uri}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFileDetails(data);
        } else {
          console.error("Failed to fetch file details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching file details:", error);
      }
    };

    fetchFileDetails();
  }, [file_id]);

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
        navigate("/my-files");
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

  const handleDownload = (e, fileId) => {
    e.stopPropagation();
    navigate(`/download-file/${fileId}/${fileDetails.file_title}`);
  };

  const handleViewDetails = (e, contributorId) => {
    e.stopPropagation();
    navigate(`/about-contributor/${contributorId}`);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(time).toLocaleTimeString(undefined, options);
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
          {fileDetails ? (
            <form>
              <Typography
                variant="h5"
                style={{ margin: "30px 0px" }}
                className="login-reg-page-label-title"
              >
                File Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Title"
                    value={fileDetails.file_title}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    value={fileDetails.file_description}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                {props.userType === "Receiver" ? (
                  <Grid item xs={12} sm={12}>
                    <TextField
                      label="Uploaded By"
                      value={fileDetails.user_username}
                      fullWidth
                      InputProps={{ readOnly: true }}
                      InputLabelProps={{
                        style: { color: "#1421DC", fontSize: "20px" },
                      }}
                      onClick={(e) =>
                        handleViewDetails(e, fileDetails.contributor_id)
                      }
                    />
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Uploaded On"
                    value={formatDate(fileDetails.uploaded_at)}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Uploaded At"
                    value={formatTime(fileDetails.uploaded_at)}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Download Count"
                    value={fileDetails.download_count}
                    fullWidth
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      style: { color: "#1421DC", fontSize: "20px" },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {props.userType === "Contributor" ? (
                    <div className="actions-container">
                      <Tooltip title="Change File Password">
                        <Button
                          className="dele-cngpswd-btn"
                          onClick={(e) =>
                            handleUpdatePasswordButtonClick(
                              e,
                              fileDetails.file_id
                            )
                          }
                        >
                          Update password
                        </Button>
                      </Tooltip>
                    </div>
                  ) : (
                    <div className="actions-container">
                      <Tooltip title="Download File">
                        <Button
                          color="secondary"
                          className="dele-cngpswd-btn"
                          startIcon={<GetAppOutlinedIcon />}
                          onClick={(e) => handleDownload(e, file_id)}
                        >
                          Download
                        </Button>
                      </Tooltip>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  {props.userType === "Contributor" ? (
                    <div className="actions-container">
                      <Tooltip title="Delete File">
                        <Button
                          className="dele-cngpswd-btn"
                          onClick={(e) =>
                            handleDeleteButtonClick(e, fileDetails.file_id)
                          }
                        >
                          Delete File
                        </Button>
                      </Tooltip>
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </form>
          ) : (
            <Typography className="no-file-content">
              No file details available.
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewParticularFileDetails;
