import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = props => {
  /* constants */
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  const onAddTransition = () => {
    transition(CREATE);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookIntervew(props.id, interview).then(() => {
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
      {mode === SAVING && <Status message="Saving" />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
    </article>
  );
};

export default Appointment;
