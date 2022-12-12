import React, { useState, useEffect } from "react";
import { TextField, SelectField, RadioField, MultiSelectField } from "../../common/form";
import { validator } from "../../../utils/validation/validator.js";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { validatorConfig } from "./validatorConfig.js";
import Loader from "../../common/Loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getQualities, getQualitiesLoadingStatus } from "../../../store/qualities.js";
import { getProfessions, getProfessionsLoadingStatus } from "../../../store/professions.js";
import { getCurrentUser, getCurrentUserId, getUserById, updateUser } from "../../../store/users.js";

export const EditorPage = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    if (userId !== currentUserId) return <Navigate to={`/users/${currentUserId}/edit`}/>;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser());
    const userById = useSelector(getUserById(userId));
    const user = currentUserId === userId ? currentUser : userById;
    const { name, email, profession, gender, qualities } = user;
    const professionsCollection = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const qualitiesCollection = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

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
        dispatch(updateUser(userId, {
            ...user,
            ...data,
            qualities: data.qualities.map(quality => quality.value)
        }));
        navigate(-1);
    };

    return !professionsLoading && !qualitiesLoading ? (
        <form onSubmit={handleSubmit}>
            <button
                className="btn btn-primary offset-1 m-3 w-25"
                onClick={() => navigate(`/users/${currentUserId}`)}
            >
                Назад
            </button>
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
                type="submit"
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
