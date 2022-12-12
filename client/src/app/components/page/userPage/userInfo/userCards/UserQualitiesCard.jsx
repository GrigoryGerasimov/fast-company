import React from "react";
import { Qualities } from "../../../../ui/qualities";
import PropTypes from "prop-types";

const UserQualitiesCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <div className="card-text">
                    <Qualities idData={qualities} />
                </div>
            </div>
        </div>
    );
};

export default React.memo(UserQualitiesCard);

UserQualitiesCard.propTypes = {
    qualities: PropTypes.array
};
