import React from 'react';
import { useState } from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const renderUsersTable = () => {
        return (
            users.map((usersInfo) => (
                <tr className="line" key={usersInfo._id}>
                    <td>{usersInfo.name}</td>
                    <td>{usersInfo.qualities.map((qualitie) => (<span key={qualitie._id} className={"badge bg-" + qualitie.color}>{qualitie.name}</span>))}</td>
                    <td key={usersInfo.profession._id}>{usersInfo.profession.name}</td>
                    <td>{usersInfo.completedMeetings}</td>
                    <td>{usersInfo.rate}/5</td>
                    <td><button className="btn bg-danger" onClick={() => handleDelete(usersInfo._id)}>Delete</button></td>
                </tr>
            ))
        );
    };

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const renderPhrase = (number) => {
        return (
            number === 4 ? "человека тусанет с тобой сегодня" :
                number === 3 ? "человека тусанет с тобой сегодня" :
                    number === 2 ? "человека тусанет с тобой сегодня" :
                        "человек тусанет с тобой сегодня"
        );
    };

    const contentMain = (
        <>
            <h2><span className={users.length === 0 ? "badge bg-danger" : "badge bg-primary"}>{users.length === 0 ? "" : users.length} {renderPhrase(users.length)} </span></h2>
            <table id="mytable" className="table table-striped table-hover align-middle">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {renderUsersTable()}
                </tbody>
            </table>
        </>
    );

    return users.length === 0 ? <h3><span className="badge bg-danger">Никто не тусанет сегодня с тобой!</span></h3> : contentMain;

};

export default Users;