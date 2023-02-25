import React from "react";
import PropTypes from "prop-types";

export const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    const lastDigit = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastDigit) >= 0) return "человека тусанут";
    if (number === 1) return "человек тусанет";
  };

  return (
    <>
      <h3>
        <span
          className={"badge " + (length === 0 ? "bg-danger" : "bg-primary")}
        >
          {length === 0
            ? "Никто с тобой сегодня не тусанет"
            : `${length + " " + renderPhrase(length)} c тобой сегодня`}
        </span>
      </h3>
    </>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired
};

export default SearchStatus;
