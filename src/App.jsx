import React, {useState} from 'react'
import {SearchStatus} from './components/SearchStatus.jsx'
import {Users} from './components/Users.jsx'
import api from "./api";

export const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = userId => setUsers(prevState => prevState.filter(user => user._id !== userId)),
        handleToggleBookmark = userId => {
            const currentUserIndex = users.findIndex(user => user._id === userId),
                updatedUsers = [...users]
            updatedUsers[currentUserIndex].bookmark = !updatedUsers[currentUserIndex].bookmark
            setUsers(updatedUsers)
        }

    return !users.length ?
        <SearchStatus length={users.length}/>
        : (
            <>
                <SearchStatus length={users.length}/>
                <table className={'table align-middle'}>
                    <thead>
                    <tr>
                        <th scope={'col'}>Имя</th>
                        <th scope={'col'}>Качества</th>
                        <th scope={'col'}>Профессия</th>
                        <th scope={'col'}>Встретился, раз</th>
                        <th scope={'col'}>Оценка</th>
                        <th scope={'col'}>Избранное</th>
                        <th scope={'col'}>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <Users users={users} onDelete={handleDelete} onBookmarkToggle={handleToggleBookmark}/>
                    </tbody>
                </table>
            </>
        )
}