import React, { useEffect, useState } from "react";
import Users from "./components/users";

import api from "./api";

function App() {
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.default.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const bookmarkUsers = users.map((user) => {
      if (user._id === id) {
        user.bookmark = !user.bookmark;
      }
      return user;
    });
    setUsers(bookmarkUsers);
  };

  return (
    <div>
      {users && (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggle={handleToggleBookMark}
        />
      )}
    </div>
  );
}

export default App;
