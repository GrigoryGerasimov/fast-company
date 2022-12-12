import React from "react";
import { Profession } from "../../../../../ui/Profession";
import { UserRate } from "../../UserRate";
import PropTypes from "prop-types";

export const UserInfoBody = ({ id, name, profession, rate }) => {
    return (
        <div className="mt-3">
            <h4>{name}</h4>
            <Profession id={profession}/>
            <UserRate id={id} rate={rate}/>
        </div>
    );
};

UserInfoBody.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
