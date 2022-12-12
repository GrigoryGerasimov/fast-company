import { useState } from "react";
import { useParams } from "react-router-dom";
import { LoginForm } from "../../components/ui/login/LoginForm.jsx";
import { RegistrationForm } from "../../components/ui/registration/RegistrationForm.jsx";
import withAuthToggler from "./withAuthToggler.jsx";

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

    const SignUpForm = withAuthToggler(RegistrationForm)({ formType, toggleFormType });
    const SignInForm = withAuthToggler(LoginForm)({ formType, toggleFormType });

    return formType === "register" ? SignUpForm : SignInForm;
};

export default Login;
