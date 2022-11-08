import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./NavProfile.jsx";
import { useSelector } from "react-redux";
import { getUserLoggedInStatus } from "../../store/users.js";

const NavBar = () => {
    const isLoggedIn = useSelector(getUserLoggedInStatus());

    return (
        <div className="navbar bg-dark">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-light" style={{ textDecoration: "none" }} to="/">
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link className="nav-link text-light" style={{ textDecoration: "none" }} to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? <NavProfile/> : (
                        <Link className="nav-link text-light" style={{ textDecoration: "none" }} to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>

    );
};

export default NavBar;
