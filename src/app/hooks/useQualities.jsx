import React, { useState, useEffect, useContext } from "react";
import { qualityService } from "../services/qualityService.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualitiesContext = React.createContext();

export const useQualities = () => useContext(QualitiesContext);

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        toast.error(error);
        setError(null);
    }, [error]);

    const catchError = error => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };

    const getQualitiesByUser = id => qualities.filter(quality => quality._id === id);

    const getAllQualities = async () => {
        try {
            const { content } = await qualityService.getAll();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            catchError(error);
        }
    };

    useEffect(() => {
        getAllQualities();
    }, []);

    return (
        <QualitiesContext.Provider value={{ isLoading, getQualitiesByUser }}>
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
