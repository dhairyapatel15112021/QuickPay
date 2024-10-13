import React, { useContext } from 'react'
import { UserContext } from '../App'

export const Balance = () => {
    const {userData} = useContext(UserContext);
    return (
        <div className='flex justify-start items-center shadow-md my-2 px-3 py-4 bg-white rounded-md w-[90%] text-base'>
            <div className='font-bold'>Your Balance</div>
            <div className='font-medium mx-2'>Rs. {userData.balance}</div>
        </div>
    )
}
