import React from "react";

import Header from "../Components/Header";
import { Typography, TextField, Grid, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";

function AboutMe(props) {
  const [userDetails, setUserDetails] = useState(null);

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/${props.userType}/profile`,
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
        console.error("Failed to fetch User Deatils:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container">
        <div className="file-table-container">
          {userDetails ? (
            <form>
              <Typography
                variant="h5"
                style={{ margin: "30px 0px" }}
                className="login-reg-page-label-title"
              >
                My Profile
              </Typography>
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
              </Grid>
            </form>
          ) : (
            <Typography className="no-file-content">
              No User details available.
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
export default AboutMe;
