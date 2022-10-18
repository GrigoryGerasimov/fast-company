import React from "react";
import { Profession } from "../../../../../../ui/Profession";
import { UserRate } from "../../UserRate";
import PropTypes from "prop-types";

export const UserInfoBody = ({ name, profession, rate }) => {
    return (
        <div className="mt-3">
            <h4>{name}</h4>
            <Profession id={profession}/>
            <UserRate rate={rate}/>
        </div>
    );
};

UserInfoBody.propTypes = {
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.string
};
