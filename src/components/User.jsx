import React from 'react'
import {Quality} from './Quality.jsx'
import {Bookmark} from './Bookmark.jsx'

export const User = ({_id, name, qualities, profession, completedMeetings, rate, bookmark, onDelete, onBookmarkToggle}) => (
        <tr>
            <td scope='row'>{name}</td>
            <td>
                <table className='table mb-0 align-middle'>
                    <tbody>
                    <tr>
                        {qualities.map(quality => <Quality key={quality._id} {...quality}/>)}
                    </tr>
                    </tbody>
                </table>
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <Bookmark _id={_id} bookmark={bookmark} onBookmarkToggle={onBookmarkToggle}/>
            <td>
                <button className='btn btn-danger' onClick={() => onDelete(_id)}>delete</button>
            </td>
        </tr>
    )