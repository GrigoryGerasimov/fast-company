import axios from "axios";
import { getTokens } from "./localStorageService.js";
import config from "../config.json";

const httpAuth = axios.create({
    baseURL: `${config.apiEndpoint}/auth/`
});

export const authService = {
    register: async (payload) => {
        const { data } = await httpAuth.post("signUp", payload);
        return data;
    },
    signIn: async ({ email, password }) => {
        const { data } = await httpAuth.post("signInWithPassword", {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: getTokens().refreshToken
        });
        return data;
    }
};
