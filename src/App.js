import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NavBar from "./components/NavBar/NavBar";
import News from "./components/News/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { router } from "./config/config";
import Search from "./components/Search/Search";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import "./App.css";

const App = () => {
  // const [token, settoken] = useState("");
  const [logged, setlogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setlogged(true);
    }
  }, []);

  return (
    <div>
      <h1 className="head">React News App</h1>
      {!logged && (
        <div className="main-div">
          <Register />
          <Login />
        </div>
      )}
      {logged && (
        <>
          <Router>
            <NavBar />
            <Routes>
              {router.map((path) => (
                <Route
                  exact
                  key={uuidv4()}
                  path={path.path}
                  element={
                    <News
                      key={path.key}
                      newscategory={path.category}
                      country={path.country}
                    />
                  }
                />
              ))}
              <Route path="/search/:query" element={<Search />} />
            </Routes>
            <Logout />
          </Router>
        </>
      )}
    </div>
  );
};

export default App;
