import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

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
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
    props
      .bookIntervew(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => {
        transition(ERROR_SAVE, true);
      });
  };

  const confirmDelete = () => {
    transition(CONFIRM);
  };

  const deleteAppointment = () => {
    transition(DELETING, true);
    props
      .cancelInterview()
      .then(data => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETE, true);
      });
  };

  const edit = () => {
    transition(EDIT);
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
      {mode === ERROR_DELETE && <Error message="Could not delete appointment" onClose={back} />}
      {mode === ERROR_SAVE && <Error message="Could not create appointment" onClose={back} />}
    </article>
  );
};

export default Appointment;
