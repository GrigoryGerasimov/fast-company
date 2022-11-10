import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, CheckBoxField } from "../../common/form";
import { validator } from "../../../utils/validation/validator.js";
import { validatorConfig } from "./validatorConfig.js";
import { useDispatch, useSelector } from "react-redux";
import { signIn, getAuthError } from "../../../store/users.js";

export const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const loginError = useSelector(getAuthError());

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
        const redirect = location.state ? location.state.from.pathname : "/";
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
            {loginError && <div className="text-danger">{loginError}</div>}
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
            {/* {info} */}
            <p className="mt-3">
                Don`t have an account?{" "}
                <span
                    className="badge bg-warning"
                    role="button"
                    // onClick={toggleFormType}
                    onClick={() => navigate("/login/signup")}
                >
                        Sign up
                </span>
            </p>
        </form>
    );
};
