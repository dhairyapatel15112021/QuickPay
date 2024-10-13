import React , {useState} from 'react'
import { Heading } from '../../components/Heading'
import { SubHeading } from '../../components/SubHeading'
import { InputBox } from '../../components/InputBox'
import { Button } from '../../components/Button'
import { BelowText } from '../../components/BelowText'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
  const [formData , setFormData] = useState({});
  const navigate = useNavigate();
  const onChangeFunction = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data)=>({...data,[name]:value}));
  }
  const submitForm = async () =>{
    try{
      const response = await axios.post("http://localhost:8080/user/signup",formData);
      if(response.status === 200){
        setFormData({});
        navigate("/signin");
      }
    }
    catch(err){
      console.log(`Error in the frontend while signup ${err}`);
    }
  }
  return (
    <div className='h-[90vh] w-screen flex justify-center items-center'>
      <div className='flex flex-col items-center bg-white rounded-md py-3 px-5 shadow-md w-80'>
        <Heading label="Sign Up"/>
        <SubHeading label="Enter your information to create an account"/>
        <InputBox name="firstname" placeholder="John" type="text" label="First Name" onchange={onChangeFunction} />
        <InputBox name="lastname" placeholder="Doe" type="text" label="Last Name" onchange={onChangeFunction}/>
        <InputBox name="email" placeholder="johndoe@example.com" type="email" label="Email" onchange={onChangeFunction} />
        <InputBox name="password" placeholder="" type="password" label="Password" onchange={onChangeFunction}/>
        <Button onclick={submitForm} label="Sign Up"/>
        <BelowText label="Already have an account?" link="Login" to="/signin"/>
      </div>
    </div>
  )
}
