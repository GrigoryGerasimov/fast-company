import { createSlice } from "@reduxjs/toolkit";
import { qualityService } from "../services/qualityService.js";

const qualitiesSlice = createSlice({
    name: "qualities",
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

const { actions: { onRequestStart, onSuccessfulRequest, onFailedRequest, onRequestEnd }, reducer: qualitiesReducer } = qualitiesSlice;

const isOutdated = date => Date.now() - date > 600_000;

export const loadQualitiesList = () => async (dispatch, getState) => {
    if (isOutdated(getState().qualities.lastFetch)) {
        dispatch(onRequestStart());
        try {
            const { content } = await qualityService.getAll();
            const qualitiesArray = !Array.isArray(content) && typeof content === "object" ? Object.values(content) : content;
            dispatch(onSuccessfulRequest(qualitiesArray));
        } catch (error) {
            dispatch(onFailedRequest(error.message));
        } finally {
            dispatch(onRequestEnd());
        }
    }
};

export const getQualities = () => state => state.qualities.entities;
export const getQualitiesLoadingStatus = () => state => state.qualities.isLoading;
export const getQualitiesByIds = qualityIds => state => {
    if (state.qualities.entities) {
        const qualityArr = [];
        for (const qualityId of qualityIds) {
            for (const qualityEntity of state.qualities.entities) {
                if (qualityEntity._id === qualityId) {
                    qualityArr.push(qualityEntity);
                    break;
                }
            }
        }
        return qualityArr;
    } else return [];
};

export default qualitiesReducer;
