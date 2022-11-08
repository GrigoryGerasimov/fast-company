import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities.js";
import professionsReducer from "./professions.js";
import usersReducer from "./users.js";

export const store = configureStore({
    reducer: combineReducers({
        qualities: qualitiesReducer,
        professions: professionsReducer,
        users: usersReducer
    })
});
