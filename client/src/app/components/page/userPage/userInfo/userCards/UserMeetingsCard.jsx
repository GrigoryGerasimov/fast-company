import React from "react";
import { Meetings } from "../../../../ui/Meetings.jsx";
import PropTypes from "prop-types";

const UserMeetingsCard = ({ meetings }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Completed meetings</span>
                </h5>
                <Meetings info={meetings}/>
            </div>
        </div>
    );
};

export default React.memo(UserMeetingsCard);

UserMeetingsCard.propTypes = {
    meetings: PropTypes.number
};
