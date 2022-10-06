import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error,
    name
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getSelectClassName = () => {
        return `form-select ${error ? "is-invalid" : ""}`;
    };
    const optionsArray = !Array.isArray(options) && typeof options === "object" ? Object.values(options) : options;
    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <select
                id={name}
                className={getSelectClassName()}
                value={value}
                name={name}
                onChange={handleChange}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray.length &&
                    optionsArray.map((option) => (
                        <option key={option.value || option._id} value={option.value || option._id}>
                            {option.label || option.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default SelectField;

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string,
    name: PropTypes.string
};