import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TextField, CheckBoxField } from "../../common/form";
import { validator } from "../../../utils/validation/validator.js";
import { validatorConfig } from "./validatorConfig.js";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { signIn } from "../../../store/users.js";

export const LoginForm = ({ info }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const validate = useCallback(() => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length;
    }, [data]);

    const isValid = !Object.keys(errors).length;

    useEffect(() => {
        validate();
    }, [validate]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = evt => {
        evt.preventDefault();
        const isValid = !validate();
        if (!isValid) return false;
        const redirect = history.location.state ? history.location.state.from.pathname : "/";
        dispatch(signIn({ payload: data, redirect }));
        // history.replace();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Логин"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                name="stayOn"
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
            {info}
        </form>
    );
};

LoginForm.propTypes = {
    info: PropTypes.object
};
