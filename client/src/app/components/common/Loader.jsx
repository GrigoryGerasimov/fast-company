import React from "react";

const Loader = () => {
    return (
        <div className="d-flex justify-content-center mt-5">
            {
                [{ key: 1 }, { key: 2 }, { key: 3 }].map(item => (
                    <div key={item.key}>
                        <div className="spinner-grow m-1" style={{ width: "0.5rem", height: "0.5rem" }} role="status"></div>
                    </div>
                ))
            }
        </div>
    );
};

export default Loader;
