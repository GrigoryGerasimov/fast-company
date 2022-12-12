import React from "react";
import PropTypes from "prop-types";

const BasicTemplate = ({ title, children }) => {
    return (
        <div className="row">
            <div className="col-md-6 offset-3 shadow p-4">
                <h3 className="mb-4">{title}</h3>
                {children}
            </div>
        </div>
    );
};

BasicTemplate.propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const getConfig = (childTypeName, child) => {
    const config = {
        UserPage: (
            <div className="row gutters-sm">
                <h3 className="mb-4">Страница пользователя</h3>
                {child}
            </div>
        ),
        EditorPage: (
            <BasicTemplate title="Изменение данных">
                {child}
            </BasicTemplate>
        ),
        RegistrationForm: (
            <BasicTemplate title="Регистрация">
                {child}
            </BasicTemplate>
        ),
        LoginForm: (
            <BasicTemplate title="Авторизация">
                {child}
            </BasicTemplate>
        )
    };

    return config[childTypeName] ?? child;
};
