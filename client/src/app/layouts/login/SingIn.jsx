import React from "react";
import { LoginForm } from "../../components/ui/login/LoginForm";

const SignIn = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-3 shadow p-4">
                    <h3 className="mb-4">Авторизация</h3>
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
