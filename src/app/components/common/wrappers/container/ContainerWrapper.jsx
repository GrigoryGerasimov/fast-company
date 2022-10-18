import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getConfig } from "./config.jsx";
import { toast } from "react-toastify";

const ContainerWrapper = ({ containerClass, children }) => {
    useEffect(() => {
        !React.Children.count(children) && toast.warn("Не забудь поместить сюда потомки");
    }, [children]);

    return (
        <div className={`container ${containerClass}`}>
            {React.Children.map(children, child => React.cloneElement(getConfig(child.type.name, child), { ...child.props }))}
        </div>
    );
};

export default React.memo(ContainerWrapper);

ContainerWrapper.defaultProps = {
    containerClass: "mt-5"
};

ContainerWrapper.propTypes = {
    containerClass: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
