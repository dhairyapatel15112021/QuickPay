import React,{useContext, useState} from 'react'
import { Heading } from '../../components/Heading'
import { SubHeading } from '../../components/SubHeading'
import { InputBox } from '../../components/InputBox'
import { Button } from '../../components/Button'
import { BelowText } from '../../components/BelowText'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../App'


export const Signin = () => {
  const [formData , setFormData] = useState({});
  const {setUserData} = useContext(UserContext);
  const navigate = useNavigate();
  const onChangeFunction = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data)=>({...data,[name]:value}));
  }
  const submitForm = async () =>{
    try{
      const response = await axios.post("http://localhost:8080/user/signin",formData);
      if(response.status === 200){
        const data = response.data;
        localStorage.setItem("token",`bearer ${data.token}`);
        setUserData(()=>({"firstname":data.firstname,"lastname":data.lastname,"balance":data.balance}));
        setFormData({});
        navigate("/dashboard");
      }
    }
    catch(err){
      console.log(`Error in the frontend while signin ${err}`);
    }
  }
  return (
    <div className='h-[90vh] w-screen flex justify-center items-center'>
    <div className='flex flex-col items-center bg-white rounded-md py-3 px-5 shadow-md w-80'>
      <Heading label="Sign In"/>
      <SubHeading label="Enter your credentials to access your account"/>
      <InputBox name="email" placeholder="johndoe@example.com" type="email" label="Email" onchange={onChangeFunction}/>
      <InputBox name="password" placeholder="" type="password" label="Password" onchange={onChangeFunction}/>
      <Button onclick={submitForm} label="Sign In"/>
      <BelowText label="Don't have an account?" link="Sign Up" to="/signup"/>
    </div>
  </div>
  )
}
