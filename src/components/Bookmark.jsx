import React from 'react'

export const Bookmark = ({bookmark, ...rest}) => {
    const {_id, onBookmarkToggle} = {...rest}

    return (
        <td onClick={() => onBookmarkToggle(_id)}>{!bookmark ? <i className={'bi bi-bookmark'}></i> : <i className={'bi bi-bookmark-fill'}></i>}</td>
    )
}