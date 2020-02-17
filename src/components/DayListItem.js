import React from "react";
import classNames from "classnames";

import "./DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li onClick={() => setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light"># {spots} available</h3>
    </li>
  );
}
