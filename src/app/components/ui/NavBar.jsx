import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import NavProfile from "./NavProfile.jsx";

const NavBar = () => {
    const { currentUser } = useAuth();

    return (
        <div className="navbar bg-dark">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-light" style={{ textDecoration: "none" }} to="/">
                            Main
                        </Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link text-light" style={{ textDecoration: "none" }} to="/users">
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser ? <NavProfile/> : (
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
