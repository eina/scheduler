export const getAppointmentsForDay = (state, day) => {
  const dayMatched = state.days.filter(x => x.name === day);

  if (dayMatched.length) {
    const appts = dayMatched[0].appointments;
    return appts.map(id => {
      return state.appointments[id];
    });
  } else {
    return [];
  }
};
