import React, { useState, useEffect } from "react";
import { TextField, SelectField, RadioField, MultiSelectField } from "../../form";
import { validator } from "../../../../utils/validation/validator.js";
import { useHistory, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { validatorConfig } from "./validatorConfig.js";
import Loader from "../../Loader.jsx";
import { useProfessions, useQualities, useAuth } from "../../../../hooks";

export const EditorPage = ({ user }) => {
    const history = useHistory();
    const { userId } = useParams();
    const { updateCurrentUser } = useAuth();
    const { name, email, profession, gender, qualities } = user;
    const { professions: professionsCollection, isLoading: professionsLoading } = useProfessions();
    const { qualities: qualitiesCollection, isLoading: qualitiesLoading } = useQualities();

    const professionsList = professionsCollection.map(profession => ({
        label: profession.name,
        value: profession._id
    }));
    const qualitiesList = qualitiesCollection.map(quality => ({
        label: quality.name,
        value: quality._id,
        color: quality.color
    }));

    const [data, setData] = useState({
        name,
        email,
        profession,
        gender,
        qualities: qualities.map(quality => qualitiesList.find(qualitiesListItem => qualitiesListItem.value === quality))
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return !Object.keys(errors).length;
    };

    const isValid = !Object.keys(errors).length;

    useEffect(() => {
        validate();
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const isValid = validate();
        if (!isValid) return false;
        const updatedData = {
            ...user,
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        };
        try {
            await updateCurrentUser(userId, updatedData);
        } catch (error) {
            setErrors(error);
        } finally {
            history.push(`/users/${userId}`);
        }
    };

    return !professionsLoading && !qualitiesLoading ? (
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
                options={professionsList}
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
            <button
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Обновить
            </button>
        </form>
    ) : (
        <Loader/>
    );
};

EditorPage.propTypes = {
    user: PropTypes.object
};
