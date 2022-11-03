import React from "react";
import { UserPic } from "../../UserPic";
import { EditButton } from "../../../../../../ui/EditButton";
import { UserInfoBody } from "./UserInfoBody.jsx";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../../../../../../store/users.js";
import PropTypes from "prop-types";

export const UserInfoCardBody = ({ id, source, name, profession, rate }) => {
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            {currentUserId === id && (
                <EditButton id={id}/>
            )}
            <div className="d-flex flex-column align-items-center text-center position-relative">
                <UserPic source={source} className="rounded-circle" width="150"/>
                <UserInfoBody
                    name={name}
                    profession={profession}
                    rate={rate}
                />
            </div>
        </>
    );
};

UserInfoCardBody.propTypes = {
    id: PropTypes.string,
    source: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.string
};
