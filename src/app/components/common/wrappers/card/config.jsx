import React from "react";
import PropTypes from "prop-types";

const BasicTemplate = ({ cardBodyClass = "", children }) => {
    return (
        <div className={`card-body ${cardBodyClass}`}>
            {children}
        </div>
    );
};

BasicTemplate.propTypes = {
    cardBodyClass: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export const getConfig = (childTypeName, child) => {
    const config = {
        NewComment: (
            <BasicTemplate>
                <h2>New comment</h2>
                {child}
            </BasicTemplate>
        ),
        Comments: (
            <BasicTemplate>
                <h2>Comments</h2>
                {child}
            </BasicTemplate>
        ),
        QualitiesList: (
            <BasicTemplate cardBodyClass="d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <div className="card-text">
                    {child}
                </div>
            </BasicTemplate>
        ),
        Meetings: (
            <BasicTemplate cardBodyClass="d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Completed meetings</span>
                </h5>
                {child}
            </BasicTemplate>
        ),
        UserInfoCardBody: (
            <BasicTemplate>
                {child}
            </BasicTemplate>
        ),
        UserComment: (
            <BasicTemplate cardBodyClass="bg-light">
                <div className="row">
                    <div className="col">
                        {child}
                    </div>
                </div>
            </BasicTemplate>
        )
    };

    return config[childTypeName] ?? child;
};
