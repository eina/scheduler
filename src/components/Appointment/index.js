import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "../../hooks/useVisualMode";

const Appointment = props => {
  /* constants */
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

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

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const deleteAppointment = () => {
    transition(DELETING);
    props.cancelInterview().then(data => {
      transition(EMPTY);
    });
  };

  const edit = () => {
    transition(EDIT);
    props.editInterview();
    // console.log("what are the props here", props);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAddTransition} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={edit}
          onDelete={confirmDelete}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={deleteAppointment}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
    </article>
  );
};

export default Appointment;
