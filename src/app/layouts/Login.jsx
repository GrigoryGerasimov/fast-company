import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { LoginForm } from "../components/ui/login/LoginForm.jsx";
import { RegistrationForm } from "../components/ui/registration/RegistrationForm.jsx";
import ContainerWrapper from "../components/ui/ContainerWrapper.jsx";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return formType === "register" ? (
        <ContainerWrapper>
            <div className="col-md-6 offset-3 shadow p-4">
                <h3 className="mb-4">Регистрация</h3>
                <RegistrationForm />
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
            </div>
        </ContainerWrapper>
    ) : (
        <ContainerWrapper>
            <div className="col-md-6 offset-3 shadow p-4">
                <h3 className="mb-4">Авторизация</h3>
                <LoginForm />
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
            </div>
        </ContainerWrapper>
    );
};

export default Login;
