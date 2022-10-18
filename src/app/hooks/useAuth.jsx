import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { setTokens, getTokens, removeTokens } from "../services/localStorageService.js";
import { authConstants } from "../utils/constants/authConstants.js";
import { userService } from "../services/userService.js";
import { toast } from "react-toastify";
import { FirebaseAuthError } from "../utils/derivedClasses/FirebaseAuthError.js";
import { getRandomNumberInRange } from "../utils/randomizer/getRandomNumberInRange.js";
import Loader from "../components/common/Loader.jsx";
import { getRandomImg } from "../utils/randomizer/getRandomImg.js";
import { setIntoStorage, getFromStorage, removeFromStorage } from "../utils/storage";

const AuthContext = React.createContext();
export const httpAuth = axios.create();
const { firebase } = authConstants;

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [newUser, setNewUser] = useState(null);
    const [isUserUpdated, setUserUpdated] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [stayOn, setStayOn] = useState(getFromStorage("stayOn") ?? false);
    const history = useHistory();

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
            await createUser({
                _id: data.localId,
                email,
                rate: getRandomNumberInRange(1, 5, { withFloor: false, withPrecision: true }),
                completedMeetings: getRandomNumberInRange(0, 200, { withFloor: true }),
                image: getRandomImg(),
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getCurrentUser = async id => {
        try {
            const { content } = await userService.get(id);
            setCurrentUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };

    const updateCurrentUser = async (id, data) => {
        try {
            await userService.update(id, data);
            setUserUpdated(prevState => !prevState);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        const { accessToken, userId } = getTokens();
        if (accessToken) {
            getCurrentUser(userId);
        } else {
            setLoading(false);
        }
    }, [isUserUpdated]);

    const signIn = async ({ email, password, stayOn }) => {
        try {
            const { data } = await httpAuth.post(authConstants.firebase.FIREBASE_SIGN_IN_WITH_PASS_ENDPOINT(), {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            setStayOn(stayOn);
            setIntoStorage("stayOn", stayOn);
            const { localId } = data;
            await getCurrentUser(localId);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const signOut = () => {
        removeTokens();
        removeFromStorage("stayOn");
        setCurrentUser(null);
        history.replace("/login");
    };

    const signOutOnUnload = () => removeTokens();

    useEffect(() => {
        !stayOn && window.addEventListener("beforeunload", signOutOnUnload, false);
        return () => {
            !stayOn && window.removeEventListener("beforeunload", signOutOnUnload, false);
        };
    }, [stayOn]);

    return (
        <AuthContext.Provider value={{ signUp, signIn, signOut, createUser, currentUser, newUser, updateCurrentUser }}>
            {!isLoading ? children : <Loader/>}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
