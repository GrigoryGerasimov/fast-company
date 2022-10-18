import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import { UserPic } from "../common/page/userPage";

const NavProfile = () => {
    const { currentUser } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn text-light dropdown-toggle d-flex align-items-center">
                <div className="me-2 text-light">{currentUser.name}</div>
                <UserPic
                    source={currentUser.image}
                    className="img-responsive rounded-circle"
                    alt="avatar"
                    width="50"
                    height="50"
                />
            </div>
            <div className={`w-100 dropdown-menu ${isOpen ? "show" : ""}`}>
                <Link to={`/users/${currentUser._id}`} className="dropdown-item">My Profile</Link>
                <Link to="/logout" className="dropdown-item">Log Out</Link>
            </div>
        </div>
    );
};

export default NavProfile;
