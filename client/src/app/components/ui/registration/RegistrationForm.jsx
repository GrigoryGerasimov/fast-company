import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, SelectField, RadioField, MultiSelectField, CheckBoxField } from "../../common/form";
import { validator } from "../../../utils/validation/validator.js";
import { validatorConfig } from "./validatorConfig.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signUp } from "../../../store/users.js";
import PropTypes from "prop-types";

export const RegistrationForm = ({ qualities, professions }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        profession: "",
        gender: "male",
        qualities: [],
        license: false
    });

    const qualitiesList = qualities.map(quality => ({
        label: quality.name,
        value: quality._id
    }));

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
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const isValid = !validate();
        if (!isValid) return false;
        const newData = {
            ...data,
            name: `${data.firstName} ${data.lastName}`,
            qualities: data.qualities.map(quality => quality.value)
        };
        dispatch(signUp(newData));
        toast.success("Вы успешно зарегистрированы в системе");
        navigate("/");
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
            <TextField
                label="Имя"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
                error={errors.firstName}
            />
            <TextField
                label="Фамилия"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
                error={errors.lastName}
            />
            <SelectField
                label="Профессия"
                value={data.profession}
                onChange={handleChange}
                defaultOption="Выбрать..."
                options={professions}
                error={errors.profession}
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.gender}
                name="gender"
                onChange={handleChange}
                label="Пол"
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Качества"
                defaultValue={data.qualities}
                error={errors.qualities}
            />
            <CheckBoxField
                value={data.license}
                name="license"
                onChange={handleChange}
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить
            </button>
            <p className="mt-3">
                Already have an account?{" "}
                <span
                    className="badge bg-info"
                    role="button"
                    onClick={() => navigate("/login/signin")}
                >
                        Sign in
                </span>
            </p>
        </form>
    );
};

RegistrationForm.propTypes = {
    qualities: PropTypes.array,
    professions: PropTypes.array
};
