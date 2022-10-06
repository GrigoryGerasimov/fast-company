import React, { useCallback } from "react";
import { useMockData } from "../hooks";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = useCallback(() => {
        initialize();
    }, []);
    return (
        <div className="container mt-5">
            <h1>Main Page</h1>
            <h3>Инициализация данных в Firebase</h3>
            <div>
                <div>Status: <output>{status}</output></div>
                <div>
                    <label htmlFor="progress">Progress:</label>{" "}
                    <progress id="progress" max="100" value={progress}>{progress}</progress>
                </div>
                {error && <div>{error}</div>}
            </div>
            <button
                className="btn btn-primary"
                onClick={handleClick}
            >
                Инициализировать
            </button>
        </div>
    );
};

export default Main;
