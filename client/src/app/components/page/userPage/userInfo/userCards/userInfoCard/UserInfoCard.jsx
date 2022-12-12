import React from "react";
import { CardWrapper } from "../../../../../common/wrappers";
import { UserInfoCardBody } from "./UserInfoCardBody.jsx";
import PropTypes from "prop-types";

const UserInfoCard = ({ id, imgSource, name, profession, rate }) => {
    return (
        <CardWrapper>
            <UserInfoCardBody
                id={id}
                source={imgSource}
                name={name}
                profession={profession}
                rate={rate}
            />
        </CardWrapper>
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
