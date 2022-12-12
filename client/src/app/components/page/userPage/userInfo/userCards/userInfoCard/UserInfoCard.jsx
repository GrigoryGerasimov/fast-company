import React from "react";
import { UserInfoCardBody } from "./UserInfoCardBody.jsx";
import PropTypes from "prop-types";

const UserInfoCard = ({ id, imgSource, name, profession, rate }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <UserInfoCardBody
                    id={id}
                    source={imgSource}
                    name={name}
                    profession={profession}
                    rate={rate}
                />
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
    rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
