import React, { useState, useEffect, useContext } from "react";
import { professionService } from "../services/professionService.js";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ProfessionsContext = React.createContext();

export const useProfessions = () => useContext(ProfessionsContext);

export const ProfessionsProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [professions, setProfessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    const errorCatcher = error => {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    };

    const getProfession = id => professions.find(prof => prof._id === id);

    const getProfessionsList = async () => {
        try {
            const { content } = await professionService.getAll();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    useEffect(() => {
        getProfessionsList();
    }, []);

    return <ProfessionsContext.Provider value={{ isLoading, professions, getProfession }}>{children}</ProfessionsContext.Provider>;
};

ProfessionsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
