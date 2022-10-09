import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { setTokens } from "../services/localStorageService.js";
import { authConstants } from "../utils/constants/authConstants.js";
import { userService } from "../services/userService.js";
import { toast } from "react-toastify";
import { FirebaseAuthError } from "../utils/derivedClasses/FirebaseAuthError.js";

const AuthContext = React.createContext();
const httpAuth = axios.create();
const { firebase } = authConstants;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [newUser, setNewUser] = useState({});
    const [error, setError] = useState(null);

    const errorCatcher = error => {
        const { code, message } = error.response.data.error;
        setError(message);
        if (code === 400) {
            throw new FirebaseAuthError(message);
        }
    };

    useEffect(() => {
        error && toast.error(error);
        setError(null);
    }, [error]);

    const createUser = async data => {
        try {
            const { content } = await userService.update(data._id, data);
            setNewUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const signUp = async ({ email, password, ...rest }) => {
        try {
            const { data } = await httpAuth.post(firebase.FIREBASE_SIGN_UP_ENDPOINT(), {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            errorCatcher(error);
        }
    };

    const signIn = async ({ email, password }) => {
        try {
            const { data } = await httpAuth.post(authConstants.firebase.FIREBASE_SIGN_IN_WITH_PASS_ENDPOINT(), {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (error) {
            errorCatcher(error);
        }
    };

    return (
        <AuthContext.Provider value={{ signUp, signIn, createUser, newUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
