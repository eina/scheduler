import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const apptsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");

    Promise.all([daysPromise, apptsPromise, interviewersPromise]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setState({
    //   ...state,
    //   appointments
    // });

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(res => {
        console.log("in the res after setting appointment!", res);
        if (res.status === 204) {
          console.log("wow correct status! set state now!");
          setState({
            ...state,
            appointments
          });
        }
      })
      .catch(err => console.error(err));
  };

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
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        <ul>
          {appointments.map(appointment => {
            const interview = getInterview(state, appointment.interview);
            return (
              <Appointment
                {...appointment}
                key={appointment.id}
                interview={interview}
                interviewers={interviewers}
                bookIntervew={bookInterview}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
