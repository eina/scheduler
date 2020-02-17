import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = ({ interviewers, value, setInterviewer }) => {
  const listItem = interviewers.map(x => (
    <InterviewerListItem
      key={x.id}
      name={x.name}
      avatar={x.avatar}
      selected={x.id === value}
      onChange={e => setInterviewer(x.id)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers_list">{listItem}</ul>
    </section>
  );
};

export default InterviewerList;
