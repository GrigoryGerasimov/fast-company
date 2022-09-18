import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibility(prevState => !prevState);
    };
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClassName = () => `form-control ${error && "is-invalid"}`;
    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>{" "}
            <div className="input-group has-validation">
                <input
                    type={passwordVisibility ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClassName()}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="btn btn--outline-secondary"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={`bi bi-eye${passwordVisibility ? "-slash" : ""}`}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

export default TextField;

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string
};
