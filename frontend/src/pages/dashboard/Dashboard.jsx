import React, { useContext, useEffect, useState } from 'react'
import { Balance } from '../../components/Balance'
import { Button } from '../../components/Button'
import { UserName } from '../../components/UserName'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Dashboard = () => {
  const [users,setUsers] = useState([]);
  const [filter,setFilter] = useState("");
  const navigate = useNavigate();
  const getUsers = async (url)=>{
      try{
        const response = await axios.get(url,{
          headers : {
            Authorization : localStorage.getItem("token")
          }
        });
        if(response.status === 200){
          setUsers(response.data.users);
        }
        else{
          console.log("Error in frontend from backend while fetching users");
        }
      }
      catch(err){
        console.log("Error in frontend while fetching users");
      }
  }
  // useEffect(()=>{ 
  //   getUsers("http://localhost:8080/user/bulk");
  // },[]);
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      getUsers(`http://localhost:8080/user/bulk?filter=${filter}`);
    },(filter ? 1000 : 0));
    return () => clearTimeout(timeout);
  },[filter]);

  return (
    <div className='flex flex-col items-center'>
      <Balance/>
      <div className='w-[90%] my-3 shadow-md px-3 py-4 bg-white rounded-md'>
        <div className='text-base font-semibold'>Users</div>
        <input onChange={(event)=>setFilter(event.target.value)} type="text" placeholder="Search Users.." className='border p-2 rounded w-full my-3' />
        <div className='flex flex-col gap-1'>
            {
              users.map((user)=>{
                return(
                  <div className='flex justify-between items-center' key={user._id}>
                    <div className='flex justify-between items-center gap-5'>
                      <UserName firstname={user.firstname}/>
                      <div>{user.firstname} {user.lastname}</div>
                    </div>
                    <div>
                      <Button onclick={()=>navigate(`/send?id=${user._id}&firstname=${user.firstname}&lastname=${user.lastname}`)} label="Send Money"/>
                    </div>
                  </div>
                )
              })
            }
        </div>
        </div>
    </div>
  )
}
