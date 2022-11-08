import { createSlice } from "@reduxjs/toolkit";
import { commentService } from "../services/commentService.js";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        deletedCommentId: null
    },
    reducers: {
        onRequestStart(state) {
            state.isLoading = true;
        },
        onSuccessfulRequest(state, { payload }) {
            state.entities = payload;
        },
        onFailedRequest(state, { payload }) {
            state.error = payload;
        },
        onRequestEnd(state) {
            state.isLoading = false;
        },
        commentCreationSuccessfulRequest(state, { payload }) {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(payload);
        },
        commentCreationFailedRequest(state, { payload }) {
            state.error = payload;
        },
        onSuccessfulDeletion(state, { payload }) {
            state.entities.filter(entity => entity._id !== payload);
            state.deletedCommentId = payload;
        },
        onFailedDeletion(state, { payload }) {
            state.error = payload;
        }
    }
});

const {
    actions: {
        onRequestStart,
        onSuccessfulRequest,
        onFailedRequest,
        onRequestEnd,
        commentCreationSuccessfulRequest,
        commentCreationFailedRequest,
        onSuccessfulDeletion,
        onFailedDeletion
    }, reducer: commentsReducer
} = commentsSlice;

export const loadCommentsList = userId => async (dispatch) => {
    dispatch(onRequestStart());
    try {
        const { content } = await commentService.get({ orderBy: '"pageId"', equalTo: `"${userId}"` });
        const commentsArray = !Array.isArray(content) && typeof content === "object" ? Object.values(content) : content;
        dispatch(onSuccessfulRequest(commentsArray));
    } catch (error) {
        dispatch(onFailedRequest(error.message));
    } finally {
        dispatch(onRequestEnd());
    }
};

export const createComment = (userId, currentUserId, payload) => async (dispatch) => {
    const comment = {
        ...payload,
        pageId: userId,
        userId: currentUserId,
        created_at: Date.now(),
        _id: nanoid()
    };
    try {
        const { content } = await commentService.update(comment._id, comment);
        dispatch(commentCreationSuccessfulRequest(content));
    } catch (error) {
        dispatch(commentCreationFailedRequest(error.message));
    }
};

export const deleteComment = commentId => async (dispatch) => {
    try {
        const deletedId = await commentService.delete(commentId);
        dispatch(onSuccessfulDeletion(deletedId));
    } catch (error) {
        dispatch(onFailedDeletion(error.message));
    }
};

export const getComments = () => state => state.comments.entities ? [...state.comments.entities].sort((a, b) => b.created_at - a.created_at) : null;
export const getCommentsLoadingStatus = () => state => state.comments.isLoading;
export const getDeletedCommentId = () => state => state.comments.deletedCommentId;

export default commentsReducer;
