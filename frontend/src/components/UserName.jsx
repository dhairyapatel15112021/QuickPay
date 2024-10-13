import React from 'react'

export const UserName = ({firstname}) => {
    const shortUserName = (firstname) => {
        return firstname ? firstname[0].toUpperCase() : "?";
    }
  return (
    <div className='flex justify-center items-center bg-gray-200 rounded-full h-10 w-10 font-bold text-lg'>{shortUserName(firstname)}</div>
  )
}
