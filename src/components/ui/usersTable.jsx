import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";

const UsersTable = ({ users, onSort, selectedSort, onToggle, onDelete }) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      sort: true,
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    professions: { path: "profession.name", name: "Профессия", sort: true },
    completedMeetings: {
      path: "completedMeetings",
      name: "Встретился, раз",
      sort: true
    },
    rate: { path: "rate", name: "Оценка", sort: true },
    bookmark: {
      path: "bookmark",
      name: "Статус",
      component: (user) => (
        <BookMark
          key={user._id}
          status={user.bookmark}
          onClick={() => onToggle(user._id)}
        />
      ),
      sort: true
    },
    delete: {
      component: (user) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
      )
    }
  };
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
