import React from "react";
import ListItem from "./ListItem";

const List = ({ items, value, onChange }) => {
  return (
    <ul>
      {items.map(item => {
        <ListItem
          key={item.id}
          selected={item.id === value}
          setItem={e => onChange(item.id)}
          {...item}
        />;
      })}
    </ul>
  );
};

export default List;
