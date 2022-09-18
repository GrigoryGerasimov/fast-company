import React from "react";
import { Link } from "react-router-dom";
import { UserPic, UserRate } from "../index";
import PropTypes from "prop-types";

const UserInfoCard = ({ id, name, profession, rate }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <Link to={`/users/${id}/edit`}>
                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                        <i className="bi bi-gear"></i>
                    </button>
                </Link>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <UserPic
                        className="rounded-circle"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession}</p>
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
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.number
};
