import React from 'react'
import { Link } from 'react-router-dom'

export const BelowText = ({label,link,to}) => {
  return (
    <div className='flex my-2 text-sm font-semibold'>
        <div>{label}</div>
        <Link to={to} className='underline mx-1'>{link}</Link>
    </div>
  )
}
