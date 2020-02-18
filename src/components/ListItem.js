import React from "react";

const ListItem = props => {
  // const itemClass = `list__item ${props.selected ? "list__item--selected" : ""}`;
  return (
    <li className={props.itemClass} onClick={props.setItem}>
      {props.label}
    </li>
  );
};

export default ListItem;
