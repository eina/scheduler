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
      const apptID = value.id;
      const updateSpots = spots => {
        if (value.interview) {
          // value.isEdit is only available during create/edit
          return value.isEdit ? spots : spots - 1;
        } else {
          return spots + 1;
        }
      };

      const appointment = {
        ...state.appointments[apptID],
        interview: value.interview
      };

      const appointments = {
        ...state.appointments,
        [apptID]: appointment
      };

      return {
        ...state,
        appointments,
        days: state.days.map(day => {
          return day.name !== state.day ? day : { ...day, spots: updateSpots(day.spots) };
        })
      };
    }
    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
};

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
