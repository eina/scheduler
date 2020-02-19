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

export const getInterview = (state, interview) => {
  if (interview) {
    const { student, interviewer } = interview;
    return { student, interviewer: state.interviewers[interviewer] };
  } else {
    return null;
  }
};

export const getInterviewersForDay = (state, day) => {
  const dayMatched = state.days.filter(x => x.name === day);

  if (dayMatched.length) {
    const appts = dayMatched[0].appointments;
    return appts.map(id => {
      const appt = state.appointments[id];
      if (appt.interview) {
        const { interviewer } = appt.interview;
        console.log("what are you", state.interviewers[interviewer]);
        return state.interviewers[interviewer];
      }
    });
  }
  return [];
};
