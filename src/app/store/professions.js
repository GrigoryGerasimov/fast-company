import { createSlice } from "@reduxjs/toolkit";
import { professionService } from "../services/professionService.js";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        onRequestStart(state) {
            state.isLoading = true;
        },
        onSuccessfulRequest(state, { payload }) {
            state.entities = payload;
            state.lastFetch = Date.now();
        },
        onFailedRequest(state, { payload }) {
            state.error = payload;
        },
        onRequestEnd(state) {
            state.isLoading = false;
        }
    }
});

const { actions: { onRequestStart, onSuccessfulRequest, onFailedRequest, onRequestEnd }, reducer: professionsReducer } = professionsSlice;

const isOutdated = date => Date.now() - date > 600_000;

export const loadProfessionsList = () => async (dispatch, getState) => {
    if (isOutdated(getState().professions.lastFetch)) {
        dispatch(onRequestStart());
        try {
            const { content } = await professionService.getAll();
            const professionsArray = !Array.isArray(content) && typeof content === "object" ? Object.values(content) : content;
            dispatch(onSuccessfulRequest(professionsArray));
        } catch (error) {
            dispatch(onFailedRequest(error.message));
        } finally {
            dispatch(onRequestEnd());
        }
    }
};

export const getProfessions = () => state => state.professions.entities;
export const getProfessionsLoadingStatus = () => state => state.professions.isLoading;
export const getProfessionsById = id => state => state.professions.entities.find(professionEntity => professionEntity._id === id);

export default professionsReducer;
