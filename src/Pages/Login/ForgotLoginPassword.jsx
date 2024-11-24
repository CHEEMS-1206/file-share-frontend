import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import Header from "../Components/Header";
import LoaderSpinner from "../Components/Loader";

import { toast } from "react-toastify";

function ForgotPassword(props) {
  const [user_email, setUserEmail] = useState("");
  const [user_type, setUserType] = useState("");
  const [otp, setOtp] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:5001/api/forgot-password", {
      method: "POST",
      body: JSON.stringify({ user_email, user_type }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsOtpGenerated(true);
          setSuccessMsg(data.msg);
          toast.success(data.msg);
          setTimeout(() => {
            setSuccessMsg("");
          }, 3000);
        } else {
          setError(data.msg);
          toast.error(data.msg);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);
        console.error("Error:", error);
      })
      .fiannly(() => {
        setIsLoading(false);
      });
  };

  const handleOtpVerifySubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:5001/api/otp-verify", {
      method: "POST",
      body: JSON.stringify({ user_email, user_type, otp }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setIsEmailVerified(true);
          setSuccessMsg(data.msg);
          toast.success(data.msg);
          setTimeout(() => {
            setSuccessMsg("");
          }, 3000);
        } else {
          setError(data.msg);
          toast.error(data.msg);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);
        console.error("Error:", error);
      })
      .finall(() => {
        setIsLoading(false);
      });
  };

  const handleResetPasswordSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch("http://localhost:5001/api/change-password", {
      method: "POST",
      body: JSON.stringify({
        user_email,
        user_type,
        new_password,
        confirm_new_password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Password updated successfully !");
          navigate("/login");
        } else {
          setError(data.msg);
          toast.error(data.msg);
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
        setTimeout(() => {
          setError("");
        }, 3000);
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return isLoading ? (
    <div className="forgot-password-page">
      <Header isLoggedIn={props.isLoggedIn} user_type={props.user_type} />
      <LoaderSpinner />
    </div>
  ) : (
    <>
      <Header isLoggedIn={props.isLoggedIn} user_type={props.user_type} />
      <div className="container mt-4">
        <Form
          onSubmit={
            !isOtpGenerated
              ? handleForgotPasswordSubmit
              : isEmailVerified
              ? handleResetPasswordSubmit
              : handleOtpVerifySubmit
          }
        >
          <Form.Label className={`${error ? "text-danger" : "text-success "} `}>
            {error || successMsg}
          </Form.Label>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-reg-page-label-title">
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter User Email"
              value={user_email}
              onChange={(e) => setUserEmail(e.target.value)}
              disabled={isOtpGenerated && !isEmailVerified}
            />
          </Form.Group>

          {!isOtpGenerated ? (
            <>
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
              <Button type="submit" className="login-reg-page-btn">
                Submit
              </Button>
            </>
          ) : !isEmailVerified ? (
            <>
              <Form.Group controlId="formBasicOtp">
                <Form.Label className="login-reg-page-label-title">
                  OTP
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="login-reg-page-btn">
                Verify OTP
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="formBasicNewPassword">
                <Form.Label className="login-reg-page-label-title">
                  New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBasicConfirmNewPassword">
                <Form.Label className="login-reg-page-label-title">
                  Confirm New Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirm_new_password}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="login-reg-page-btn">
                Reset Password
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );
}

export default ForgotPassword;
