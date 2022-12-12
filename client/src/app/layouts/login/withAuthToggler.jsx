import React from "react";
import PropTypes from "prop-types";
import { ContainerWrapper } from "../../components/common/wrappers";

const withAuthToggler = Component => {
    const ReturnedComponent = ({ formType, toggleFormType, ...rest }) => {
        const signInInfo = (
            <p className="mt-3">
                Already have an account?{" "}
                <span
                    className="badge bg-info"
                    role="button"
                    onClick={toggleFormType}
                >
                        Sign in
                </span>
            </p>
        );
        const signUpInfo = (
            <p className="mt-3">
                Don`t have an account?{" "}
                <span
                    className="badge bg-warning"
                    role="button"
                    onClick={toggleFormType}
                >
                        Sign up
                </span>
            </p>
        );

        return (
            <ContainerWrapper>
                <Component info={formType === "register" ? signInInfo : signUpInfo} {...rest}/>
            </ContainerWrapper>
        );
    };

    ReturnedComponent.propTypes = {
        formType: PropTypes.string,
        toggleFormType: PropTypes.func
    };

    return ReturnedComponent;
};

export default withAuthToggler;
