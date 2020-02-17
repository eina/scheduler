import React from "react";

import "./InterviewerListItem.scss";

const InterviewListItem = ({ name, avatar, selected, setInterviewer }) => {
  return (
    <li className="interviewers__item" setInterviewer={setInterviewer}>
      <img className="interviewers__item-image" src={`${avatar}`} alt={`${name}`} />
      {selected && name}
    </li>
  );
};

export default InterviewListItem;
