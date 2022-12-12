import { useState, useEffect } from "react";
import { getFromStorage, setIntoStorage, removeFromStorage } from "../utils/storage";

export const useBookmarks = () => {
    const [bookmarkedIds, setBookmarkedIds] = useState();

    useEffect(() => {
        setBookmarkedIds(getFromStorage("bookmarks") || []);
    }, []);

    const handleToggleBookmark = userId => {
        if (!bookmarkedIds || bookmarkedIds.indexOf(userId) === -1) {
            setBookmarkedIds(prevState => {
                prevState.push(userId);
                return prevState;
            });
        } else {
            setBookmarkedIds(prevState => prevState.filter(id => id !== userId));
        }
    };

    useEffect(() => {
        setIntoStorage("bookmarks", bookmarkedIds);
        return () => {
            removeFromStorage("bookmarks");
        };
    }, [bookmarkedIds, handleToggleBookmark]);

    return { bookmarkedIds, handleToggleBookmark };
};
