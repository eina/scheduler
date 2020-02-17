import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  const { disabled, onClick } = props;
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {props.children}
    </button>
  );
}
