import React, { useState } from "react";
import SelectField from "../../../../form/SelectField.jsx";
import PropTypes from "prop-types";
import { validator } from "../../../../../../utils/validation/validator.js";
import { validatorConfig } from "../../validatorConfig.js";
import TextAreaField from "../../../../form/TextAreaField.jsx";

const NewComment = ({ currentUserId, users, onCommentAdd }) => {
    const [commentData, setCommentData] = useState({
        pageId: currentUserId,
        userId: "",
        content: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setCommentData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(commentData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length;
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        const isValid = !validate();
        if (!isValid) return false;
        onCommentAdd(commentData);
        setCommentData(prevState => ({
            ...prevState,
            userId: "",
            content: ""
        }));
    };

    return (
        <form onSubmit={handleSubmit} className='d-flex flex-column'>
            <SelectField
                label="Отправитель"
                name="userId"
                value={commentData.userId}
                defaultOption="Выберите пользователя"
                options={users}
                onChange={handleChange}
                error={errors.userId}
            />
            <TextAreaField
                label="Сообщение"
                id="content"
                name="content"
                value={commentData.content}
                onChange={handleChange}
                error={errors.content}
            />
            <button type="submit" className="btn btn-primary align-self-end">Опубликовать</button>
        </form>
    );
};

export default React.memo(NewComment);

NewComment.propTypes = {
    currentUserId: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.object),
    onCommentAdd: PropTypes.func
};
