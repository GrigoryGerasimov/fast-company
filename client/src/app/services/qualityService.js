import { httpService } from "./httpService.js";

const qualityEndpoint = "quality/";

export const qualityService = {
    get: async id => {
        const { data } = await httpService.get(qualityEndpoint + id);
        return data;
    },
    getAll: async () => {
        const { data } = await httpService.get(qualityEndpoint);
        return data;
    },
    update: async (id, payload) => {
        const { data } = await httpService.put(qualityEndpoint + id, payload);
        return data;
    },
    delete: async id => {
        await httpService.delete(qualityEndpoint + id);
        return id;
    }
};
