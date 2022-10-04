import { useState, useEffect } from "react";
import professions from "../mockData/professions.json";
import qualities from "../mockData/qualities.json";
import users from "../mockData/users.json";
import { professionService } from "../services/professionService.js";
import { userService } from "../services/userService.js";
import { qualityService } from "../services/qualityService.js";

const statusConstants = {
    IDLE: "Not Started",
    PENDING: "In Progress",
    SUCCEEDED: "Ready",
    FAILED: "Failed"
};

export const useMockData = () => {
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(statusConstants.IDLE);
    const [progress, setProgress] = useState(0);
    const [count, setCount] = useState(0);
    const summaryCount = professions.length + qualities.length + users.length;

    const incrementCount = () => setCount(prevCount => prevCount + 1);

    const updateProgress = () => {
        if (count && status === statusConstants.IDLE) {
            setStatus(statusConstants.PENDING);
        }
        const newProgress = Math.floor((count / summaryCount) * 100);
        if (progress < newProgress) setProgress(() => newProgress);
        if (newProgress === 100) setStatus(statusConstants.SUCCEEDED);
    };

    useEffect(() => {
        updateProgress();
    }, [count]);

    const initialize = async () => {
        try {
            for (const prof of professions) {
                await professionService.update(prof._id, prof);
                incrementCount();
            }
            for (const user of users) {
                await userService.update(user._id, user);
                incrementCount();
            }
            for (const quality of qualities) {
                await qualityService.update(quality._id, quality);
                incrementCount();
            }
        } catch (error) {
            setError(error);
            setStatus(statusConstants.FAILED);
        }
    };
    return { error, initialize, progress, status };
};
