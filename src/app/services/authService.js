import axios from "axios";
import { authConstants } from "../utils/constants/authConstants.js";
import { getTokens } from "./localStorageService.js";

const httpAuth = axios.create();

export const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(authConstants.firebase.FIREBASE_SIGN_UP_ENDPOINT(), {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    signIn: async ({ email, password }) => {
        const { data } = await httpAuth.post(authConstants.firebase.FIREBASE_SIGN_IN_WITH_PASS_ENDPOINT(), {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post(authConstants.firebase.FIREBASE_EXCHANGE_REFRESH_TOKEN(), {
            grant_type: "refresh_token",
            refresh_token: getTokens().refreshToken
        });
        return data;
    }
};
