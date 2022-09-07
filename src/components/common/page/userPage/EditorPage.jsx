import React, { useState, useEffect } from "react";
import api from "../../../../api";
import TextField from "../../../common/form/TextField.jsx";
import SelectField from "../../../common/form/SelectField.jsx";
import RadioField from "../../../common/form/RadioField.jsx";
import MultiSelectField from "../../../common/form/MultiSelectField.jsx";
import { validator } from "../../../../utils/validation/validator.js";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { validatorConfig } from "../../../../utils/validation/validatorConfig.js";
import { getProfessionById, getQualities } from "../../../../utils/outputFormat.js";

export const EditorPage = ({ user, id, qualities, professions }) => {
    const history = useHistory();
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        profession: user.profession.name,
        sex: user.sex,
        qualities: user.qualities
    });
    const [updatedData, setUpdatedData] = useState({});
    const [updatedUser, setUpdatedUser] = useState({});
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length;
    };
    const isValid = !Object.keys(errors).length;
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = evt => {
        setUpdatedData({
            ...user,
            ...data,
            profession: getProfessionById(data.profession, professions),
            qualities: getQualities(data.qualities, qualities)
        });
        setTimeout(() => {
            if (updatedUser) history.push(`/users/${updatedUser._id}`);
        }, 1000);
        evt.preventDefault();
        const isValid = validate();
        if (!isValid) return false;
    };

    useEffect(() => {
        api.users.update(id, updatedData).then(response => setUpdatedUser(response));
    }, [updatedData]);

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
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
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Качества"
                defaultValue={data.qualities}
                error={errors.qualities}
            />
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Обновить</button>
        </form>
    );
};

EditorPage.propTypes = {
    user: PropTypes.object,
    id: PropTypes.string,
    qualities: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        color: PropTypes.string
    })),
    professions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string
    }))
};
