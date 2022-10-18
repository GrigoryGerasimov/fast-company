import React from "react";
import { Link } from "react-router-dom";
import { UserPic, UserRate } from "../index";
import { Profession } from "../../../../../ui/Profession.jsx";
import PropTypes from "prop-types";
import { useAuth } from "../../../../../../hooks";

const UserInfoCard = ({ id, imgSource, name, profession, rate }) => {
    const { currentUser } = useAuth();

    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === id && (
                    <Link to={`/users/${id}/edit`}>
                        <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                            <i className="bi bi-gear"></i>
                        </button>
                    </Link>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <UserPic source={imgSource} className="rounded-circle" width="150"/>
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <Profession id={profession}/>
                        <UserRate rate={rate}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(UserInfoCard);

UserInfoCard.propTypes = {
    id: PropTypes.string,
    imgSource: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.string
};
