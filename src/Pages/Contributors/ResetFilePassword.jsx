import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { Form, Button, Alert } from "react-bootstrap";

function ResetFilePassword(props) {
  const navigate = useNavigate();
  const { file_id } = useParams();
  const [file_password, setNewPass] = useState("");
  const [cnfNewPass, setCnfNewPass] = useState("");
  const [error, setError] = useState("");

  const updateFilePassword = async (e) => {
    e.preventDefault();
    if (!file_password || !cnfNewPass) {
      setError("Password or confirm password field can't be empty.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (file_password !== cnfNewPass) {
      setError("Password and confirm password do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else {
      try {
        const response = await fetch(
          `http://localhost:5001/api/contributor/my-file/reset-password/${file_id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ file_password }),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alert("Password for this file changed successfully !");
          navigate("/home");
        } else {
          const data = await response.json();
          setError(data.msg);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);

        console.error("Error fetching file details:", error);
      }
    }
  };

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <div className="container mt-4 login-container">
        <Form onSubmit={updateFilePassword}>
          <Form.Label
            disabled={!error}
            className={`${error ? "text-danger" : "text-success"} `}
          >
            {error}
          </Form.Label>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-reg-page-label-title">
              New Password
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new password ..."
              value={file_password}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCnfPassword">
            <Form.Label className="login-reg-page-label-title">
              Confirm New Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password ..."
              value={cnfNewPass}
              onChange={(e) => setCnfNewPass(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Button type="submit" className="mt-4 login-reg-page-btn">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default ResetFilePassword;
