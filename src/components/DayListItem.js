import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  const formatSpots = spots => {
    if (spots === 0) {
      return `no spots remaining`;
    }

    return `${spots} ${spots === 1 ? "spot" : "spots"} remaining`;
  };

  return (
    <li onClick={() => setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
