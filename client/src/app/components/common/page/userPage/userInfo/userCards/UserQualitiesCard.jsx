import React from "react";
import { Qualities } from "../../../../../ui/qualities";
import { CardWrapper } from "../../../../wrappers";
import PropTypes from "prop-types";

const UserQualitiesCard = ({ qualities }) => {
    return (
        <CardWrapper>
            <Qualities idData={qualities} />
        </CardWrapper>
    );
};

export default React.memo(UserQualitiesCard);

UserQualitiesCard.propTypes = {
    qualities: PropTypes.array
};
