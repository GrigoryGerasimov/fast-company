import React, { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { commentService } from "../services/commentService.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../store/users.js";
import PropTypes from "prop-types";

const CommentsContext = React.createContext();

export const useComments = () => useContext(CommentsContext);

export const CommentsProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [updatedCommentId, setUpdatedCommentId] = useState("");
    const [deletedCommentId, setDeletedCommentId] = useState("");
    const [error, setError] = useState(null);
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const createComment = async data => {
        const comment = {
            ...data,
            pageId: userId,
            userId: currentUserId,
            created_at: Date.now(),
            _id: nanoid()
        };
        try {
            const updatedId = await commentService.update(comment._id, comment);
            setUpdatedCommentId(updatedId);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const deleteComment = async id => {
        try {
            const deletedId = await commentService.delete(id);
            setDeletedCommentId(deletedId);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getFilteredComments = useCallback(async () => {
        try {
            const { content } = await commentService.get({ orderBy: '"pageId"', equalTo: `"${userId}"` });
            const commentsArray = !Array.isArray(content) && typeof content === "object" ? Object.values(content) : content;
            const sortedComments = commentsArray.sort((a, b) => b.created_at - a.created_at);
            setComments(sortedComments);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }, [userId, updatedCommentId, deletedCommentId]);

    useEffect(() => {
        getFilteredComments();
    }, [getFilteredComments]);

    return <CommentsContext.Provider value={{ isLoading, comments, createComment, getFilteredComments, deleteComment }}>{children}</CommentsContext.Provider>;
};

CommentsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
