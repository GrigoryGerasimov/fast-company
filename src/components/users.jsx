import React, {useState} from 'react'
import api from '../api/index.js'

export const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = userId => setUsers(prevState => prevState.filter(user => user._id !== userId))

    const renderPhrase = number => !number ? <div className='info-phrase badge bg-danger'>Никто с тобой не тусанёт</div> :
        <div className='info-phrase badge bg-primary'>{number} {number > 1 && number < 5 ? 'человека' : 'человек'} тусанёт с тобой сегодня</div>

    const createUserRow = data => (
        <>
            <td scope='row'>{data.name}</td>
            <td>
                <table className='table mb-0 align-middle'>
                    <tbody>
                    <tr>
                        {data.qualities.map(quality => <td key={quality._id}
                                                           className={`quality badge bg-${quality.color} m-1`}>{quality.name}</td>)}
                    </tr>
                    </tbody>
                </table>
            </td>
            <td key={data.profession._id}>{data.profession.name}</td>
            <td>{data.completedMeetings}</td>
            <td>{data.rate}/5</td>
            <td>
                <button className='btn btn-danger' onClick={() => handleDelete(data._id)}>delete</button>
            </td>
        </>
    )

    const renderUserRow = () => users.map(user => (<tr key={user._id}>{createUserRow(user)}</tr>))

    return !users.length ? renderPhrase(users.length) : (
        <React.Fragment>
            {renderPhrase(users.length)}
            <table className='table align-middle'>
                <thead>
                <tr>
                    <th scope='col'>Имя</th>
                    <th scope='col'>Качества</th>
                    <th scope='col'>Профессия</th>
                    <th scope='col'>Встретился, раз</th>
                    <th scope='col'>Оценка</th>
                    <th scope='col'>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {renderUserRow()}
                </tbody>
            </table>
        </React.Fragment>
    )
}