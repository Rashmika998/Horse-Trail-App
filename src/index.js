import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./globalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import AddTrail from "./pages/AddTrail";
import AddCamp from "./pages/AddCamp";
import DisplayTrail from "./pages/DisplayTrail";
import DisplayCamp from "./pages/DisplayCamp";
import TrailSearchPage from "./pages/TrailSearchPage";
import CampSearchPage from "./pages/CampSearchPage";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import MyTrails from "./pages/MyTrails";
import MyTrailsList from "./pages/MyTrailsList";
import MyCamps from "./pages/MyCamps";
import MyCampsList from "./pages/MyCampsList";
import AddedTrails from "./pages/AddedTrails";
import AddedCamps from "./pages/AddedCamps";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import MyProfile from "./pages/MyProfile";
import EditTrail from "./pages/EditTrail";
import EditCamp from "./pages/EditCamp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <Router>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" exact element={<About />} />
          <Route exact path="/add-trail" element={<AddTrail />} />
          <Route exact path="/add-camp" element={<AddCamp />} />
          <Route exact path="/display-trail/:id" element={<DisplayTrail />} />
          <Route exact path="/display-camp/:id" element={<DisplayCamp />} />
          <Route path="/trails" exact element={<TrailSearchPage />} />
          <Route path="/camps" exact element={<CampSearchPage />} />
          <Route path="/my-trails" exact element={<MyTrails />} />
          <Route
            path="/my-trails-list/:type"
            exact
            element={<MyTrailsList />}
          />
          <Route path="/my-camps" exact element={<MyCamps />} />
          <Route path="/my-camps-list/:type" exact element={<MyCampsList />} />
          <Route path="/added-camps" exact element={<AddedCamps />} />
          <Route path="/added-trails" exact element={<AddedTrails />} />
          <Route
            path="/my-profile"
            exact
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Signup />} />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route exact path="/edit-trail/:id" element={<EditTrail />} />
          <Route exact path="/edit-camp/:id" element={<EditCamp />} />
        </Routes>
        <Footer />
      </Router>
    </React.StrictMode>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
