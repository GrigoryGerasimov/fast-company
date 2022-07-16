import React from 'react'

export const Bookmark = ({_id, bookmark, onBookmarkToggle}) => <td onClick={() => onBookmarkToggle(_id)}>{!bookmark ? <i className='bi bi-bookmark'></i> : <i className='bi bi-bookmark-fill'></i>}</td>