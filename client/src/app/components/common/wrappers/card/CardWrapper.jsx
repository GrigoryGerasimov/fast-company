import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { getConfig } from "./config.jsx";

const CardWrapper = ({ cardClass, children }) => {
    useEffect(() => {
        !React.Children.count(children) && toast.warn("Не забудь поместить сюда потомки");
    }, [children]);

    return (
        <div className={`card ${cardClass}`}>
            {React.Children.map(children, child => React.cloneElement(getConfig(child.type.name, child), { ...child.props }))}
        </div>
    );
};

export default React.memo(CardWrapper);

CardWrapper.defaultProps = {
    cardClass: "mb-3"
};

CardWrapper.propTypes = {
    cardClass: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
