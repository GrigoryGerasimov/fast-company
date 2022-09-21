import axios from "axios";
import { logger } from "./loggingService.js";
import config from "../config.json";
import { toast } from "react-toastify";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (res) => res,
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
