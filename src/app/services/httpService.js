import axios from "axios";
import { logger } from "./loggingService.js";
import configFile from "../config.json";
import { toast } from "react-toastify";
import { httpAuth } from "../hooks/useAuth.jsx";
import { getTokens, setTokens } from "./localStorageService.js";
import { authConstants } from "../utils/constants/authConstants.js";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async config => {
        if (configFile.isFireBase) {
            config.url = !config.url.endsWith(".json") ? `${(/\/$/g.test(config.url) ? config.url.slice(0, -1) : config.url)}.json` : config.url;
            const { tokenExpireDate, refreshToken, accessToken } = getTokens();
            if (refreshToken && tokenExpireDate < Date.now()) {
                const { data } = await httpAuth.post(authConstants.firebase.FIREBASE_EXCHANGE_REFRESH_TOKEN(), {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                const { refresh_token, id_token, user_id, expires_in } = data;
                setTokens({
                    refreshToken: refresh_token,
                    idToken: id_token,
                    localId: user_id,
                    expiresIn: expires_in
                });
            }
            if (accessToken) {
                config.params = {
                    ...config.params,
                    auth: accessToken
                };
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const transformData = data => {
    return data && !data._id ? Object.keys(data).map(key => ({
        ...data[key]
    })) : data;
};

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    (error) => {
        logger.log(error);
        const { message, status } = error.response;
        if (error.response && status >= 400 && status < 500) {
            toast.error(message);
        }
        return Promise.reject(error);
    }
);

export const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete,
    patch: http.patch
};
