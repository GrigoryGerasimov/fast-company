import React, { useState } from "react";
import { validator } from "../../../../../utils/validation/validator.js";
import { validatorConfig } from "../../validatorConfig.js";
import TextAreaField from "../../../../common/form/TextAreaField.jsx";
import PropTypes from "prop-types";

const NewComment = ({ onCommentAdd }) => {
    const [commentData, setCommentData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setCommentData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(commentData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length;
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const isValid = !validate();
        if (!isValid) return false;
        onCommentAdd(commentData);
        setCommentData({});
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column">
            <TextAreaField
                label="Сообщение"
                id="content"
                name="content"
                value={commentData.content || ""}
                onChange={handleChange}
                error={errors.content}
            />
            <button type="submit" className="btn btn-primary align-self-end">
                Опубликовать
            </button>
        </form>
    );
};

export default NewComment;

NewComment.propTypes = {
    currentUserId: PropTypes.string,
    onCommentAdd: PropTypes.func
};
