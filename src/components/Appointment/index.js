import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = props => {
  /* constants */
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const onAddTransition = () => {
    transition(CREATE);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    // props.bookIntervew(props.id, interview);
    // transition(SHOW);
    props.bookIntervew(props.id, interview).then(() => {
      console.log("i got to bookInterview!");
      transition(SHOW);
    });
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAddTransition} />}
      {mode === SHOW && (
        <Show student={props.interview.student} interviewer={props.interview.interviewer} />
      )}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
    </article>
  );
};

export default Appointment;
