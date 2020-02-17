import React from "react";

const ListItem = props => {
  const itemClass = `list__item ${props.selected ? "list_item--selected" : ""}`;
  return (
    <li className={itemClass} onClick={props.setItem}>
      {props.label}
    </li>
  );
};

export default ListItem;
