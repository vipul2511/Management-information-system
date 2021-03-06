import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Ngoheader.css";
import { Link } from "react-router-dom";
import firebase from "../../firebase SDK/firebase";
const Header = () => {
  const [user, setUser] = useState();

  function login() {
    window.location.href = "/SignIn";
  }
  useEffect(() => {
    firebase.auth().onAuthStateChanged((users) => {
      if (users) {
        localStorage.setItem("UserID", users.uid);
        setUser(true);
      }
    });
  });
  function logout() {
    firebase
      .auth()
      .signOut()
      .then((success) => {
        setUser(false);
        window.location.href = "/Home";
      });
  }
  function ApplyLoan() {
    window.location.href = "/ApplyLoan";
  }

  return (
    <div>
      <Navbar bg="white" expand="lg">
        <Navbar.Brand href="#home">
          <img
            src={require("../Images/download.jfif")}
            alt="logo"
            className="img-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">
              <Link to="/Home" className="navlink">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link to="/application" className="navlink1">
                Repayment Track
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link to="/Gallery" className="navlink2">
                Gallery{" "}
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              <Link to="/DonationPayment" className="navlink3">
                Donation
              </Link>
            </Nav.Link>
            <Nav.Link href="#link">
              {" "}
              <Link to="/blog" className="navlink4">
                Success Stories
              </Link>
            </Nav.Link>
            <button
              className="btn btn12 shadow_btn"
              type="submit"
              onClick={logout}
            >
              Log out
            </button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
