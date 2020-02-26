/*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export const reducer = (state, action) => {
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
