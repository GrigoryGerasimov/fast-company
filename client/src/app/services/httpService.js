import axios from "axios";
import { logger } from "./loggingService.js";
import configFile from "../config.json";
import { toast } from "react-toastify";
import { getTokens, setTokens } from "./localStorageService.js";
import { authService } from "./authService.js";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async config => {
        const { tokenExpireDate, refreshToken, accessToken } = getTokens();
        if (configFile.isFireBase) {
            config.url = !config.url.endsWith(".json") ? `${(/\/$/g.test(config.url) ? config.url.slice(0, -1) : config.url)}.json` : config.url;
        } else {
            if (refreshToken && tokenExpireDate < Date.now()) {
                const data = await authService.refresh();
                setTokens(data);
            }
            if (accessToken) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${accessToken}`
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
        res.data = { content: res.data };
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
