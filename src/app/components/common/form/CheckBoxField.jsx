import React, { useCallback } from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = useCallback(() => {
        onChange({ name, value: !value });
    }, [onChange]);

    const getCheckBoxClassName = () => `form-check-input ${error ? "is-invalid" : ""}`;

    return (
        <div className="form-check mb-4">
            <input
                className={getCheckBoxClassName()}
                type="checkbox"
                id={name}
                value=""
                onChange={handleChange}
                checked={value}
            />
            <label className="form-check-label" htmlFor={name}>
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default React.memo(CheckBoxField);

CheckBoxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
