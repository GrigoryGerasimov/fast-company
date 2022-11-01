import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TextField, SelectField, RadioField, MultiSelectField, CheckBoxField } from "../../common/form";
import { validator } from "../../../utils/validation/validator.js";
import { validatorConfig } from "./validatorConfig.js";
import { useAuth } from "../../../hooks";
import { useSelector } from "react-redux";
import { getQualities } from "../../../store/qualities.js";
import { getProfessions } from "../../../store/professions.js";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const RegistrationForm = ({ info }) => {
    const history = useHistory();
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
    const { signUp } = useAuth();
    const qualities = useSelector(getQualities());
    const qualitiesList = qualities.map(quality => ({
        label: quality.name,
        value: quality._id
    }));
    const professions = useSelector(getProfessions());
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
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const isValid = !validate();
        if (!isValid) return false;
        const newData = {
            ...data,
            name: `${data.firstName} ${data.lastName}`,
            qualities: data.qualities.map(quality => quality.value)
        };
        try {
            await signUp(newData);
            toast.success("Вы успешно зарегистрированы в системе");
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
            {info}
        </form>
    );
};

RegistrationForm.propTypes = {
    info: PropTypes.object
};
