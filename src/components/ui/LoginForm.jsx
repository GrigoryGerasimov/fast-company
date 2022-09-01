import React, { useState, useEffect } from "react";
import TextField from "../common/form/TextField.jsx";
import { validator } from "../../utils/validator.js";

export const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена некорректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            hasCapitalChar: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            hasDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length;
    };
    const isValid = !Object.keys(errors).length;
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = evt => {
        evt.preventDefault();
        const isValid = validate();
        if (!isValid) return false;
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-3 shadow p-4">
                    <h3 className="mb-4">Авторизация</h3>
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
                        <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
