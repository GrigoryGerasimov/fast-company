import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, updateUser } from "../../../../../store/users";
import PropTypes from "prop-types";

export const UserRate = ({ id, rate }) => {
    const [userRate, setUserRate] = useState(rate);
    const users = useSelector(getUsers());
    const dispatch = useDispatch();

    const handleUserUpdate = userId => {
        const updatedUser = users.find(user => user._id === userId);
        dispatch(updateUser(userId, {
            ...updatedUser,
            rate: userRate.toPrecision(2)
        }));
    };

    const handleRateIncrement = () => {
        setUserRate(prevValue => prevValue + 0.1);
    };

    const handleRateDecrement = () => {
        setUserRate(prevValue => prevValue - 0.1);
    };

    useEffect(() => {
        handleUserUpdate(id);
    }, [userRate]);

    return (
        <div className="text-muted">
            <i className="bi bi-caret-down-fill text-primary" role="button" onClick={handleRateDecrement}></i>
            <i className="bi bi-caret-up text-secondary" role="button" onClick={handleRateIncrement}></i>
            <span className="ms-2">{rate.toPrecision(2)}</span>
        </div>
    );
};

UserRate.propTypes = {
    id: PropTypes.string,
    rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
