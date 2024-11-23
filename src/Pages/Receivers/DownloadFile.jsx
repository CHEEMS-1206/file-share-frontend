import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Typography, Button } from "@mui/material";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function DownloadFile(props) {
  const navigate = useNavigate();
  const [file_password, setFilePassword] = useState("");
  const { file_id, file_title } = useParams();
  const [error, setError] = useState("");

  const downloadHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5001/api/receiver/file/download/${file_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ file_password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.msg);
        toast.error(data.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      } else {
        toast.success("File downloaded successfully !");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file_title);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
    } catch (error) {
      setError(error.msg);
      toast.error("Some error occurred try re-logging in.");
      setTimeout(() => {
        setError("");
      }, 3000);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      ></Header>
      <div className="container mt-4 login-container">
        <Typography variant="p" className="login-reg-page-label-title">
          Download File : {file_title}
        </Typography>
        <Form onSubmit={downloadHandler}>
          <Form.Label
            disabled={!error}
            className={`${error ? "text-danger" : "text-success"} `}
          >
            {error}
          </Form.Label>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-reg-page-label-title">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={file_password}
              onChange={(e) => setFilePassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="mt-4 login-reg-page-btn"
            >
              Download
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
export default DownloadFile;
