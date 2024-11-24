import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Header from "../Components/Header";
import LoaderSpinner from "../Components/Loader";

function Login(props) {
  const [user_email, setUser_email] = useState("");
  const [user_type, setUserType] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        body: JSON.stringify({ user_email, user_type, user_password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        props.setIsLoggedIn(true);
        props.setUserType(user_type);
        toast.success("User Logged in successfully!");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        toast.error("User Login failed, " + data.msg);
        setError(data.msg);
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      setError("Something went wrong. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const moveToForgotPassword = () => {
    navigate("/forgot-login-password");
  };

  return isLoading ? (
    <div className="login-page">
      <Header isLoggedIn={props.isLoggedIn} user_type={props.user_type} />
      <LoaderSpinner />
    </div>
  ) : (
    <>
      <Header isLoggedIn={props.isLoggedIn} user_type={props.user_type} />
      <div className="container mt-4 login-container">
        <Form onSubmit={handleLogin}>
          <Form.Label
            disabled={!error}
            className={`${error ? "text-danger" : "text-success"} `}
          >
            {error}
          </Form.Label>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-reg-page-label-title">
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter User Email"
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUserType">
            <Form.Label className="login-reg-page-label-title">
              User Type
            </Form.Label>
            <Form.Control
              as="select"
              value={user_type}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="">Select User Type</option>
              <option value="Receiver">Receiver</option>
              <option value="Contributor">Contributor</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-reg-page-label-title">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={user_password}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Button type="submit" className="mt-4 login-reg-page-btn">
              Login
            </Button>
            <Button
              onClick={moveToForgotPassword}
              className="mt-4 login-reg-page-btn"
            >
              Forgot Password ?
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;
