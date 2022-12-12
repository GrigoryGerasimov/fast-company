import React from "react";
import { CardWrapper } from "../../../../wrappers";
import { Meetings } from "../../../../../ui/Meetings.jsx";
import PropTypes from "prop-types";

const UserMeetingsCard = ({ meetings }) => {
    return (
        <CardWrapper>
            <Meetings info={meetings}/>
        </CardWrapper>
    );
};

export default React.memo(UserMeetingsCard);

UserMeetingsCard.propTypes = {
    meetings: PropTypes.number
};
