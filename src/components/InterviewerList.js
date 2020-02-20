import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = ({ interviewers, value, onChange }) => {
  const listItem = interviewers.map(x => {
    return (
      <InterviewerListItem
        key={x.id}
        name={x.name}
        avatar={x.avatar}
        selected={x.id === value}
        setInterviewer={e => onChange(x.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItem}</ul>
    </section>
  );
};

export default InterviewerList;
