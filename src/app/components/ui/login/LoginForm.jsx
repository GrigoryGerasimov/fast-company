import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/TextField.jsx";
import CheckBoxField from "../../common/form/CheckBoxField.jsx";
import { validator } from "../../../utils/validation/validator.js";
import { validatorConfig } from "./validatorConfig.js";
import { useAuth } from "../../../hooks";
import { toast } from "react-toastify";

export const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const { signIn } = useAuth();

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
    const handleSubmit = async evt => {
        evt.preventDefault();
        const isValid = !validate();
        if (!isValid) return false;
        try {
            await signIn(data);
            toast.success(`Вы успешно вошли в систему под адресом ${data.email}`);
            history.replace("/");
        } catch (error) {
            setErrors(error);
        }
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
        </form>
    );
};
