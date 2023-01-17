import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";

const User = ({ ...user }) => {
  return (
    <>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((item) => (
          <Qualitie {...item} key={item._id} />
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <Bookmark status={user.bookmark} {...user} />
      </td>
    </>
  );
};

export default User;
