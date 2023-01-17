import React from "react";
import User from "./user";

const Users = ({ users, ...rest }) => {
  if (users.length > 0) {
    return (
      <table
        id="mytable"
        className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Статус</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <User {...user} {...rest} />
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => rest.onDelete(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};

export default Users;
