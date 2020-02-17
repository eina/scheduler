import React from "react";
import ListItem from "./ListItem";

const List = props => {
  const items = props.items.map(item => {
    <ListItem
      key={item.id}
      label={item.label}
      selected={item.id === props.value}
      setItem={e => props.onChange(item.id)}
    />;
  });

  return <ul>{items}</ul>;
};

export default List;
