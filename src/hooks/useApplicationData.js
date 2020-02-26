import { useReducer, useEffect } from "react";
import axios from "axios";

import { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, reducer } from "../reducers/application";

/**
 * Custom hooks for application-wide functionalities that
 * interact with Application's state
 */
const useApplicationData = () => {
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
    const isEdit = state.appointments[id].interview !== null;

    return axios.put(`/api/appointments/${id}`, appointment).then(res => {
      if (res && res.status === 204) {
        const dispatchValue = { id, interview, isEdit };
        dispatch({ type: SET_INTERVIEW, value: dispatchValue });
      }
      return res;
    });
  };

  const cancelInterview = id => {
    return axios.delete(`/api/appointments/${id}`).then(res => {
      if (res && res.status === 204) {
        const dispatchValue = { id, interview: null };
        dispatch({ type: SET_INTERVIEW, value: dispatchValue });
        return res;
      }
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
