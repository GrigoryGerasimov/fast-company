import React, { useCallback } from "react";
import PropTypes from "prop-types";

const RadioField = ({ label, name, value, onChange, options }) => {
    const handleChange = useCallback(({ target }) => {
        onChange({ name: target.name, value: target.value });
    }, [onChange]);

    return (
        <div className="mb-4">
            <label className="form-label" htmlFor="rad">
                {label}
            </label>
            <div>
                {options.map((option) => (
                    <div
                        key={`${option.name}_${option.value}`}
                        className="form-check form-check-inline"
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            id={`${option.name}_${option.value}`}
                            name={name}
                            value={option.value}
                            checked={option.value === value}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check=label"
                            htmlFor={`${option.name}_${option.value}`}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(RadioField);

RadioField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
};
