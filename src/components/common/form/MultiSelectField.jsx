import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, options, onChange, name, defaultValue, error }) => {
    const optionsArray = !Array.isArray(options) && typeof options === "object" ? Object.values(options) : options;
    const handleChange = (value) => {
        onChange({ name, value });
    };
    const getMultiSelectClassName = () => {
        return `basic-multi-select ${error ? "is-invalid" : ""}`;
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                options={optionsArray}
                className={getMultiSelectClassName()}
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                closeMenuOnScroll={false}
            />
            {error && (<div className="invalid-feedback">
                {error}
            </div>)}
        </div>
    );
};

export default MultiSelectField;

MultiSelectField.propTypes = {
    label: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultValue: PropTypes.array,
    error: PropTypes.string
};
