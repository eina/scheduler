import React from "react";
import PropTypes from "prop-types";
import DayListItem from "components/DayListItem";

/**
 * Renders sidebar of weekdays
 * @param {Object} { days: Array, day: string, setDay: function }
 */
const DayList = ({ days, day, setDay }) => {
  return (
    <ul>
      {days.map(d => (
        <DayListItem
          key={d.id}
          name={d.name}
          spots={d.spots}
          selected={d.name === day}
          setDay={setDay}
        />
      ))}
    </ul>
  );
};

DayList.propTypes = {
  days: PropTypes.array,
  day: PropTypes.string,
  setDay: PropTypes.func.isRequired
};

export default DayList;
