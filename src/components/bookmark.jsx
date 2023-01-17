import React from "react";

const BookMark = ({ status, ...rest }) => {
  return (
    <button
      className={"bi bi-bookmark-heart" + (status ? "-fill" : "")}
      onClick={() => rest.onToggle(rest._id)}></button>
  );
};

export default BookMark;
