import React, { useEffect } from "react";
import { getConfig } from "./config.jsx";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ContainerWrapper = ({ containerClass, children }) => {
    const location = useLocation();
    const { userId } = useParams();

    useEffect(() => {
        !React.Children.count(children) && toast.warn("Не забудь поместить сюда потомки");
    }, [children]);

    return (
        <div className={`container ${containerClass}`}>
            {React.Children.map(children, child => {
                const childTypeName = location.pathname === `/users/${userId}` ? "UserPage" : location.pathname === `/users/${userId}/edit` ? "EditorPage" : child.type.name;
                return React.cloneElement(getConfig(childTypeName, child), { ...child.props });
            })}
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
