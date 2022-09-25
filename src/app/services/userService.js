import { httpService } from "./httpService.js";

const userEndpoint = "user/";

export const userService = {
    get: async id => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.put(userEndpoint + id, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(userEndpoint + id);
        return data;
    }
};
