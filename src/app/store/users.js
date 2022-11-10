import { createSlice, createAction } from "@reduxjs/toolkit";
import { userService } from "../services/userService.js";
import { authService } from "../services/authService.js";
import { setTokens, getTokens, removeTokens } from "../services/localStorageService.js";
import { getRandomNumberInRange } from "../utils/randomizer/getRandomNumberInRange.js";
import { getRandomImg } from "../utils/randomizer/getRandomImg.js";
// import history from "../utils/history/history.js";
import { FirebaseAuthError } from "../utils/authError/FirebaseAuthError.js";

const initialState = getTokens().accessToken ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: {
        userId: getTokens().userId
    },
    isLoggedIn: true,
    dataLoaded: false,
    deletedUserId: null
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false,
    deletedUserId: null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        onRequestStart(state) {
            state.isLoading = true;
        },
        onSuccessfulRequest(state, { payload }) {
            state.entities = payload;
            state.dataLoaded = true;
        },
        onSuccessfulDeletion(state, { payload }) {
            state.entities = state.entities.filter(entity => entity._id !== payload);
            state.deletedUserId = payload;
        },
        onFailure(state, { payload }) {
            state.error = payload;
        },
        onRequestEnd(state) {
            state.isLoading = false;
        },
        authSuccessfulRequest(state, { payload }) {
            state.auth = payload;
            state.isLoggedIn = true;
        },
        authFailedRequest(state, { payload }) {
            state.error = payload;
        },
        userCreationSuccessfulRequest(state, { payload }) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(payload);
        },
        userCreationFailedRequest(state, { payload }) {
            state.error = payload;
        },
        userSuccessfulSignOut(state) {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userSuccessfulUpdate(state, { payload }) {
            state.entities = state.entities.map(entity => entity._id === payload.id ? payload.content : entity);
        },
        userFailedUpdate(state, { payload }) {
            state.error = payload;
        },
        authRequested(state) {
            state.error = null;
        }
    }
});

const {
    actions: {
        onRequestStart,
        onSuccessfulRequest,
        onSuccessfulDeletion,
        onFailure,
        onRequestEnd,
        authRequested,
        authSuccessfulRequest,
        authFailedRequest,
        userCreationSuccessfulRequest,
        userCreationFailedRequest,
        userSuccessfulSignOut,
        userSuccessfulUpdate,
        userFailedUpdate
    }, reducer: usersReducer
} = usersSlice;

const userCreateRequested = createAction("users/createRequested");
const userUpdateRequested = createAction("users/updateRequested");

export const loadUsersList = () => async (dispatch) => {
    dispatch(onRequestStart());
    try {
        const { content } = await userService.getAll();
        dispatch(onSuccessfulRequest(content));
    } catch (error) {
        dispatch(onFailure(error.message));
    } finally {
        dispatch(onRequestEnd());
    }
};

export const signIn = ({ payload }) => async (dispatch) => {
    dispatch(authRequested());
    const { email, password } = payload;
    try {
        const data = await authService.signIn({ email, password });
        dispatch(authSuccessfulRequest({
            userId: data.localId
        }));
        setTokens(data);
        // history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            dispatch(new FirebaseAuthError(message));
            throw new FirebaseAuthError(message);
        } else dispatch(authFailedRequest(error.message));
    }
};

export const createUser = payload => async (dispatch) => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.update(payload._id, payload);
        dispatch(userCreationSuccessfulRequest(content));
        // history.push("/");
    } catch (error) {
        dispatch(userCreationFailedRequest(error.message));
    }
};

export const updateUser = (id, payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(id, payload);
        dispatch(userSuccessfulUpdate({ id, content }));
    } catch (error) {
        dispatch(userFailedUpdate(error.message));
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        setTokens(data);
        dispatch(authSuccessfulRequest({
            userId: data.localId
        }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: getRandomNumberInRange(1, 5, { withFloor: false, withPrecision: true }),
            completedMeetings: getRandomNumberInRange(0, 200, { withFloor: true }),
            image: getRandomImg(),
            bookmark: false,
            ...rest
        }));
    } catch (error) {
        dispatch(authFailedRequest(error.message));
    }
};

export const signOut = () => (dispatch) => {
    removeTokens();
    dispatch(userSuccessfulSignOut());
    // history.replace("/login");
};

export const deleteUser = (userId) => async (dispatch) => {
    try {
        const deletedId = await userService.delete(userId);
        dispatch(onSuccessfulDeletion(deletedId));
    } catch (error) {
        dispatch(onFailure(error.message));
    }
};

const usersSelectors = {
    getUsers: () => state => state.users.entities ? state.users.entities.filter(userEntity => userEntity?._id !== state.users.auth.userId) : null,
    getUserById: id => state => state.users.entities ? state.users.entities.find(userEntity => userEntity?._id === id) : null,
    getCurrentUser: () => state => state.users.entities ? state.users.entities.find(userEntity => userEntity?._id === state.users.auth.userId) : null,
    getDeletedUserId: () => state => state.users?.deletedUserId,
    getUsersLoadingStatus: () => state => state.users?.isLoading,
    getUserLoggedInStatus: () => state => state.users?.isLoggedIn,
    getDataStatus: () => state => state.users?.dataLoaded,
    getCurrentUserId: () => state => state.users.auth?.userId,
    getAuthError: () => state => state.users?.error
};

export const { getUsers, getUsersLoadingStatus, getUserById, getCurrentUser, getDeletedUserId, getUserLoggedInStatus, getDataStatus, getCurrentUserId, getAuthError } = usersSelectors;

export default usersReducer;
