import React from 'react'
import {Quality} from './Quality.jsx'
import {Bookmark} from './Bookmark.jsx'

export const User = props => {
    const {_id, name, qualities, profession, completedMeetings, rate, onDelete} = props

    return (
        <tr>
            <td scope={'row'}>{name}</td>
            <td>
                <table className={'table mb-0 align-middle'}>
                    <tbody>
                    <tr>
                        {qualities.map(quality => <Quality key={quality._id} {...quality}/>)}
                    </tr>
                    </tbody>
                </table>
            </td>
            <td key={profession._id}>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <Bookmark {...props}/>
            <td>
                <button className={'btn btn-danger'} onClick={() => onDelete(_id)}>delete</button>
            </td>
        </tr>
    )
}