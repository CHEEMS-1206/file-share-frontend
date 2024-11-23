import React from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate(); 

  const logOutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false)
    toast.success("User has been Logged Out successfully !")
    navigate("/login");
    console.log("Logged out");
  };

  const loginHandler = () => {
    navigate("/login");
    console.log("Moved to Login");
  };

  const registerHandler = () => {
    navigate("/register");
    console.log("Moved To Register");
  };

  return (
    <>
      <header>
        <div className="container-fluid header-bg">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center py-3">
              <div className="application-name" id="app-name" onClick={()=>{navigate("/home/")}}>
                File Share
              </div>
              {isLoggedIn ? (
                <button
                  className="menubar-btn"
                  id="logout"
                  onClick={logOutHandler}
                >
                  Logout
                </button>
              ) : (
                <div>
                  <button
                    className="menubar-btn me-2"
                    id="register"
                    onClick={registerHandler}
                  >
                    Register
                  </button>
                  <button
                    className="menubar-btn"
                    onClick={loginHandler}
                    id="login"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
