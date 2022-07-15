import React from 'react'

export const Quality = ({color, name, _id}) => <td className={`quality badge bg-${color} m-1`}>{name}</td>