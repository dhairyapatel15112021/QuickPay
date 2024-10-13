import React from 'react'

export const InputBox = ({label,type,placeholder,name,onchange}) => {
  return (
    <div className='flex flex-col mx-1 my-2 gap-2 w-full'>
        <div className='text-sm font-semibold'>{label}</div>
        <input name={name} type={type} placeholder={placeholder} className='border p-2 rounded' onChange={onchange} />
    </div>
  )
}
