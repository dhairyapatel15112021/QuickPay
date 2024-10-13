import React, { useContext } from 'react'
import { UserName } from '../../components/UserName';
import { Button } from '../../components/Button';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
export const Header = () => {
    const { userData ,setUserData} = useContext(UserContext);
    const navigate = useNavigate();
    const signOut = ()=>{
        localStorage.removeItem("token");
        setUserData({ firstname: "", lastname: "", balance: 0 });
        navigate("/signin");
    }
    return (
        <div className='flex justify-center items-center'>
            <div className='flex justify-between items-center shadow-md my-2 px-3 py-4 bg-white rounded-md w-[90%]'>
                <div className='text-xl font-semibold'>Paytm App</div>
                {
                    userData.firstname && <div className='flex justify-center items-center gap-2'>
                        <div className='text-lg font-medium'>Hello, {userData.firstname}</div>
                        <UserName firstname={userData.firstname} />
                        <div><Button label="logout" onclick={signOut}/></div>
                    </div>
                }
            </div>
        </div>
    )
}
