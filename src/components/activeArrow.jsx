import React from "react";
import PropTypes from "prop-types";

const ActiveArrow = ({ order }) => {
  return (
    <i
      className={"bi bi-caret" + (order === "asc" ? "-up-fill" : "-down-fill")}
    ></i>
  );
};

ActiveArrow.propTypes = {
  order: PropTypes.string.isRequired
};

export default ActiveArrow;
