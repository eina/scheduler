import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import "components/Button.scss";

const Button = props => {
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
};

Button.propTypes = {
  disabled: PropTypes.bool,
  day: PropTypes.func
};

export default Button;
