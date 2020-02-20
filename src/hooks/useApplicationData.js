/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = (state, action) => {
  const { value } = action;
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: value
      };
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        ...value
      };
    }
    case SET_INTERVIEW: {
      const appointment = {
        ...state.appointments[value.id],
        interview: value.interview
      };

      const appointments = {
        ...state.appointments,
        [value.id]: appointment
      };

      return {
        ...state,
        appointments
      };
    }
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
};

const useApplicationData = initial => {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const apptsPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");

    Promise.all([daysPromise, apptsPromise, interviewersPromise]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data }
      });
    });
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      if (res && res.status === 204) {
        dispatch({ type: SET_INTERVIEW, value: { id, interview } });
      }
      return res;
    });
  };

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`).then(res => {
      if (res && res.status === 204) {
        dispatch({ type: SET_INTERVIEW, value: { id, interview: null } });
        return res;
      }
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
