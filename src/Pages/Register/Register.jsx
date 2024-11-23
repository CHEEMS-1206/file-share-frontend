import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Header from "../Components/Header";

function Register(props) {
  const [user_email, setUser_email] = useState("");
  const [user_type, setUserType] = useState("");

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  const [isOtpGenerated, setIsOtpGenerated] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [user_username, setUsername] = useState("");
  const [user_password, setPassword] = useState("");
  const [user_confirm_password, setConfirmPassword] = useState("");
  const [user_name, setName] = useState("");
  const [user_phone_num, setPhoneNum] = useState("");
  const [user_profile_pic, setUserProfilePic] = useState("");

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const getOtp = () => {
    fetch("http://localhost:5001/api/new-user/email-verification", {
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
          startTimer(30);
          console.log(data);
          setSuccessMsg(data.msg);
          toast.success(data.msg)
          setTimeout(() => {
            setSuccessMsg("");
          }, 3000);
        } else {
          console.log(data);
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
        console.error("Error:", error);
      });
  };

  const verifyOtp = () => {
    fetch("http://localhost:5001/api/new-user/otp-verify", {
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
          console.log(data);
          setSuccessMsg(data.msg);
          toast.success(data.msg);
          setTimeout(() => {
            setSuccessMsg("");
          }, 3000);
        } else {
          setError(data.message);
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
        console.error("Error:", error);
      });
  };

  const registerUser = () => {
    fetch("http://localhost:5001/api/new-user/register", {
      method: "POST",
      body: JSON.stringify({
        user_email,
        user_type,
        user_username,
        user_password,
        user_confirm_password,
        user_name,
        user_phone_num,
        user_profile_pic,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("User Registered successfully !")
          navigate("/login");
        } else {
          setError(data.msg);
          toast.error(data.msg)
        }
      })
      .catch((error) => {
        setError("Something went wrong. Please try again later.");
        toast.error("Something went wrong. Please try again later.");
        console.error("Error:", error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isOtpGenerated) {
      if (isEmailVerified) {
        registerUser();
      } else {
        verifyOtp();
      }
    } else {
      getOtp();
    }
  };

  const handleResendOtp = () => {
    setTimer(30);
    getOtp();
  };

  const startTimer = () => {
    let time = timer > 0 ? timer : 30;
    const interval = setInterval(() => {
      time -= 1;
      setTimer(time);
      if (time === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} user_type={props.user_type} />
      <div className="container mt-4 register-container">
        <Form onSubmit={handleFormSubmit}>
          {
            <Form.Group>
              <Form.Label
                disabled={!error && !successMsg}
                className={`${
                  error && !successMsg ? "text-danger" : "text-success"
                } `}
              >
                {error + successMsg}
              </Form.Label>
            </Form.Group>
          }

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="login-reg-page-label-title">
              Email address
            </Form.Label>
            <Form.Control
              type="user_email"
              placeholder="Enter User Email"
              value={user_email}
              onChange={(e) => setUser_email(e.target.value)}
              disabled={isOtpGenerated || isEmailVerified}
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
              disabled={isOtpGenerated || isEmailVerified}
            >
              <option value="">Select User Type</option>
              <option value="Receiver">Receiver</option>
              <option value="Contributor">Contributor</option>
            </Form.Control>
          </Form.Group>

          {!isOtpGenerated ? (
            !isEmailVerified ? (
              <Button
                variant="primary"
                type="submit"
                className="login-reg-page-btn"
              >
                Submit
              </Button>
            ) : (
              ""
            )
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
              <div className="d-flex justify-content-between align-items-center ">
                <Button
                  variant={timer > 0 ? "secondary" : "primary"}
                  className="login-reg-page-btn"
                  onClick={handleResendOtp}
                  disabled={timer > 0}
                >
                  Resend OTP in {timer} Secs...
                </Button>
                <Button
                  className="login-reg-page-btn"
                  variant="primary"
                  type="submit"
                >
                  Verify OTP
                </Button>
              </div>
            </>
          ) : (
            ""
          )}

          {isEmailVerified && (
            <>
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="login-reg-page-label-title">
                  Username
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={user_username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="login-reg-page-label-title">
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={user_password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label className="login-reg-page-label-title">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={user_confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicName">
                <Form.Label className="login-reg-page-label-title">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={user_name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPhoneNo">
                <Form.Label className="login-reg-page-label-title">
                  Phone Number
                </Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={user_phone_num}
                  onChange={(e) => setPhoneNum(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicProfilePicURL">
                <Form.Label className="login-reg-page-label-title">
                  Profile Picture URL
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter profile picture URL"
                  value={user_profile_pic}
                  onChange={(e) => setUserProfilePic(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="login-reg-page-btn"
                style={{ marginBottom: "60px" }}
              >
                Register
              </Button>
            </>
          )}
        </Form>
      </div>
    </>
  );
}

export default Register;
