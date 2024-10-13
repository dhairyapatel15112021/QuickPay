import React from 'react'

export const Button = ({label,onclick}) => {
  return (
    <button onClick={onclick} className='w-full my-2 p-2 bg-blue-500 text-white rounded'>{label}</button>
  )
}
