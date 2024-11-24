import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Header from "../Components/Header";
import LoaderSpinner from "../Components/Loader";

import { toast } from "react-toastify";

function UploadNewFile(props) {
  const [file, setFile] = useState(null);
  const [file_description, setFileDescription] = useState("");
  const [file_password, setFilePassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fileSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_description", file_description);
    formData.append("file_password", file_password);

    setIsLoading(true);
    fetch("http://localhost:5001/api/contributor/add-new", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          toast.success(data.msg);
          setTimeout(() => navigate("/home"), 1000);
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
        toast.error("Some error occurred try re logging in.");
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
      ></Header>
      <div className="container">
        <Form>
          <Form.Label
            disabled={!error}
            className={`${error ? "text-danger" : "text-success"} `}
          >
            {error}
          </Form.Label>

          <Form.Group controlId="formBasicFile">
            <Form.Label className="login-reg-page-label-title">
              Select File (Docs, Excel, Ppt, or PDF)
            </Form.Label>
            <Form.Control
              type="file"
              multiple={false}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group controlId="formBasicFileDesc">
            <Form.Label className="login-reg-page-label-title">
              File Description
            </Form.Label>
            <Form.Control
              as="textarea"
              value={file_description}
              onChange={(e) => setFileDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="login-reg-page-label-title">
              Set File Password
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
              type="button"
              className="mt-4 login-reg-page-btn"
              onClick={fileSubmitHandler}
            >
              Upload
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
export default UploadNewFile;
