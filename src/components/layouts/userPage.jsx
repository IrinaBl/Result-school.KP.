import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useHistory } from "react-router-dom";
import api from "../../api";
import QualitiesList from "../qualitiesList";

const UserPage = () => {
  const params = useParams();
  const userId = params.userId;

  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    api.users.default.getById(userId).then((data) => setUser(data));
  });

  const handleAllUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div key={userId}>
        <h1>{user.name}</h1>
        <h3>Профессия: {user.profession.name}</h3>
        <QualitiesList qualities={user.qualities} />
        <h3>Встречался раз: {user.completedMeetings}</h3>
        <h3>Оценка: {user.rate}/5</h3>
        <button onClick={handleAllUsers}>Все пользователи</button>
      </div>
    );
  }
};

UserPage.propTypes = {
  userId: PropTypes.string
};

export default UserPage;
