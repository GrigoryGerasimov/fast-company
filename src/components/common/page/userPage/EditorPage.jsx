import React, { useState, useEffect } from "react";
import api from "../../../../api";
import TextField from "../../../common/form/TextField.jsx";
import SelectField from "../../../common/form/SelectField.jsx";
import RadioField from "../../../common/form/RadioField.jsx";
import MultiSelectField from "../../../common/form/MultiSelectField.jsx";
import { validator } from "../../../../utils/validator.js";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

export const EditorPage = ({ user, id }) => {
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
    const [qualities, setQualities] = useState([]);
    const [professions, setProfessions] = useState([]);
    useEffect(() => {
        api.professions.fetchAll().then(response => {
            const professionsList = Object.keys(response).map(professionName => ({
                label: response[professionName].name,
                value: response[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then(response => {
            const qualitiesList = Object.keys(response).map(qualityName => ({
                label: response[qualityName].name,
                value: response[qualityName]._id,
                color: response[qualityName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const [errors, setErrors] = useState({});
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Профессия обязательна для заполнения"
            }
        },
        qualities: {
            isRequired: {
                message: "Личностные качества обязательны для заполнения"
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
    const handleChange = (target) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.label === id) return { name: prof.label, _id: prof.value };
        }
    };
    const getQualities = (elems) => {
        const qualitiesArray = [];
        for (const elem of elems) {
            for (const quality of qualities) {
                if (elem.value === quality.value) {
                    qualitiesArray.push({
                        name: quality.label,
                        _id: quality.value,
                        color: quality.color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = evt => {
        setUpdatedData({
            ...user,
            ...data,
            profession: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
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
    id: PropTypes.string
};
