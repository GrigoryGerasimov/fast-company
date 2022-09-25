import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, id, name, value, rows, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getTextAreaClassName = () =>
        `form-control ${error ? "is-invalid" : ""}`;
    return (
        <div className="mb-4">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <textarea
                className={getTextAreaClassName()}
                id={id}
                name={name}
                rows={rows}
                value={value}
                onChange={handleChange}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextAreaField;

TextAreaField.defaultProps = {
    rows: "3"
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
