import { React, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "./NavBar";
import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import JoblyApi from "./helpers/JoblyAPI";
import Context from "./Context";
import Loader from "./Loader";
import ProtectedRoute from "./ProtectedRoute";
import "./styles/App.css";

function App() {
  // { username, firstName, lastName, email, isAdmin, applications: [jobId] }
  const [currentUser, setCurrentUser] = useState();
  const [isInitializing, setIsInitializing] = useState(true);

  const checkUserLoggedIn = async (userToken) => {
    // 1. attempt to find token
    if (userToken) {
      // 2. if found token, parse token to find username
      const { username } = jwtDecode(userToken);
      // 3. if username is found, make an api call to find user record (using the token)!
      JoblyApi.token = userToken;
      try {
        const user = await JoblyApi.getUser(username, userToken);
        // 4. store user in the state
        setCurrentUser(user);
      } catch (error) {
        // do nothing if failed to initialize
        JoblyApi.token = null;
      }
    }
    setIsInitializing(false);
  };

  const login = (userToken) => {
    checkUserLoggedIn(userToken);
    window.localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setCurrentUser();
    window.localStorage.removeItem("token");
  };

  // when landing on Jobly, check if user is already logged in
  useEffect(() => {
    const userToken = window.localStorage.getItem("token");
    checkUserLoggedIn(userToken);
  }, []);

  return (
    <div className="App">
      {isInitializing && <Loader />}
      {!isInitializing && (
        <BrowserRouter>
          <Context.Provider value={{ currentUser, setCurrentUser }}>
            <NavBar logout={logout} />
            <div className="padded-container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/companies"
                  element={<ProtectedRoute element={<Companies />} />}
                />
                <Route
                  path="/companies/:handle"
                  element={<ProtectedRoute element={<Company />} />}
                />
                <Route
                  path="/jobs"
                  element={<ProtectedRoute element={<Jobs />} />}
                />
                <Route
                  path="/profile"
                  element={<ProtectedRoute element={<Profile />} />}
                />
                <Route path="/login" element={<Login login={login} />} />
                <Route path="/signup" element={<Signup login={login} />} />
                <Route path="*" element={<div>404: Page Not Found</div>} />
              </Routes>
            </div>
          </Context.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
