import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Header from "../Components/Header";
import LoaderSpinner from "../Components/Loader";

import { toast } from "react-toastify";

function ResetFilePassword(props) {
  const navigate = useNavigate();
  const { file_id } = useParams();
  const [file_password, setNewPass] = useState("");
  const [cnfNewPass, setCnfNewPass] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateFilePassword = async (e) => {
    e.preventDefault();
    if (!file_password || !cnfNewPass) {
      setError("Password or confirm password field can't be empty.");
      toast.error("Password or confirm password field can't be empty.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    if (file_password !== cnfNewPass) {
      setError("Password and confirm password do not match.");
      toast.error("Password and confirm password do not match.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    } else {
      try {
        setIsLoading(true);
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
          // alert("Password for this file changed successfully !");
          toast.success("Password for this file changed successfully !");
          setTimeout(() => navigate("/home"), 1000);
        } else {
          const data = await response.json();
          setError(data.msg);
          toast.error(data.msg);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        toast.error("Some error occurred try re logging in.");
        setTimeout(() => {
          setError("");
        }, 3000);

        console.error("Error fetching file details:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
