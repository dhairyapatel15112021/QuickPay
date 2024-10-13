import React, { useContext, useState } from 'react'
import { Heading } from '../../components/Heading'
import { InputBox } from '../../components/InputBox'
import { Button } from '../../components/Button'
import { UserName } from '../../components/UserName'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../App'

export const SendMoney = () => {
  const {setUserData} = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const transferMoney = async () => {
    try {
      const response = await axios.post("http://localhost:8080/account/transfer", {
        to: searchParams.get("id"),
        amount: parseInt(amount)
      }, {headers: {Authorization: localStorage.getItem("token")}});
      if(response.status === 200){
        setUserData((data)=>({...data,"balance":data.balance-amount}));
        setAmount(0);
        alert("Transferred Sucessful");
      }
      else{
        console.log(`Error in frontend from backend while transfering the money ${err}`);
      }
    }
    catch (err) {
      console.log(`Error in frontend while transfering the money ${err}`);
    }
  }
  const onChangeFunction = (event) => setAmount(event.target.value);
  return (
    <div className='h-[90vh] w-screen flex justify-center items-center'>
      <div className='flex flex-col items-center bg-white rounded-md py-3 px-5 shadow-md w-80'>
        <Heading label="Send Money" />
        <div className='self-start mt-5 mb-3 flex justify-between items-center gap-5'>
          <UserName firstname={searchParams.get("firstname")} />
          <div>{searchParams.get("firstname")} {searchParams.get("lastname")}</div>
        </div>
        <InputBox onchange={onChangeFunction} label="Amount (in Rs.)" placeholder="Enter amount" type="text" />
        <Button onclick={transferMoney} label="Initiate Transfer" />
      </div>
    </div>
  )
}
