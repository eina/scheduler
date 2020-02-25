import React from "react";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "../hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          const interview = getInterview(state, appointment.interview);
          return (
            <Appointment
              {...appointment}
              key={appointment.id}
              interview={interview}
              interviewers={interviewers}
              bookIntervew={bookInterview}
              cancelInterview={() => cancelInterview(appointment.id)}
            />
          );
        })}
      </section>
    </main>
  );
}
