import { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import "./main.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import ForgotLoginPassword from "./Pages/Login/ForgotLoginPassword";

import ContributorRoutes from "./Pages/RouterMiddleware/ContributorRoutes";
import ReceiverRoutes from "./Pages/RouterMiddleware/ReceiverRoutes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? (
            <>
              {userType === "Receiver" && (
                <Route
                  path="/*"
                  element={
                    <ReceiverRoutes
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      userType={userType}
                    />
                  }
                />
              )}
              {userType === "Contributor" && (
                <Route
                  path="/*"
                  element={
                    <ContributorRoutes
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      userType={userType}
                    />
                  }
                />
              )}
            </>
          ) : (
            <>
              <Route
                path="/register"
                element={
                  <Register userType={userType} isLoggedIn={isLoggedIn} />
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    setUserType={setUserType}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route
                path="/forgot-login-password"
                element={
                  <ForgotLoginPassword
                    userType={userType}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
