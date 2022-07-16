import React from 'react'
import {User} from './User.jsx'

export const Users = ({users, ...rest}) => users.map(user => <User key={user._id} {...user} {...rest}/>)