import axios from "axios";
import { logger } from "./loggingService.js";
import configFile from "../config.json";
import { toast } from "react-toastify";

axios.defaults.baseURL = configFile.apiEndpoint;

axios.interceptors.request.use(
    config => {
        if (configFile.isFireBase) {
            config.url = !config.url.endsWith(".json") ? `${(/\/$/g.test(config.url) ? config.url.slice(0, -1) : config.url)}.json` : config.url;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const transformData = data => {
    return data ? Object.keys(data).map(key => ({
        ...data[key]
    })) : [];
};

axios.interceptors.response.use(
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
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch
};
