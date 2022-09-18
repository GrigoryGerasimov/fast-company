import React, { useEffect, useState } from "react";
import api from "../../api";
import TextField from "../common/form/TextField.jsx";
import SelectField from "../common/form/SelectField.jsx";
import RadioField from "../common/form/RadioField.jsx";
import MultiSelectField from "../common/form/MultiSelectField.jsx";
import CheckBoxField from "../common/form/CheckBoxField.jsx";
import { validator } from "../../utils/validation/validator.js";

export const RegistrationForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        gender: "male",
        qualities: [],
        license: false
    });
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
        },
        profession: {
            isRequired: {
                message: "Чтобы продолжить, пожалуйста, выберите свою профессию из списка"
            }
        },
        qualities: {
            isRequired: {
                message: "Чтобы продолжить, пожалуйста, выберите свои личностные качества из списка"
            }
        },
        license: {
            isRequired: {
                message: "Вы не можете использовать наш сервис без лицензионного соглашения"
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
        console.log({
            ...data,
            profession: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
        });
        evt.preventDefault();
        const isValid = validate();
        if (!isValid) return false;
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
                options={qualities}
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
            <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">Отправить</button>
        </form>
    );
};
