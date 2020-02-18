import React from "react";
import classNames from "classnames";

import "./InterviewerListItem.scss";

const InterviewListItem = ({ name, avatar, selected, setInterviewer }) => {
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });
  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={`${avatar}`} alt={`${name}`} />
      {selected && name}
    </li>
  );
};

export default InterviewListItem;
