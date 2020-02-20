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

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(res => {
        if (res && res.status === 204) {
          setState({
            ...state,
            appointments
          });
        }
        return res;
      })
      .catch(err => console.error(err));
  };

  const cancelInterview = id => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then(res => {
      if (res && res.status === 204) {
        setState({
          ...state,
          appointments
        });
        return res;
      }
    });
  };

  const editInterview = () => {
    // console.log(state.appointments[id]);
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
                cancelInterview={() => cancelInterview(appointment.id)}
                editInterview={editInterview}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
