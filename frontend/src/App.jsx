import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from './pages/header/Header'
import axios from 'axios';

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState({ firstname: "", lastname: "", balance: 0 });
  const navigate = useNavigate();
  const checkLogin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/me", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      if (response.status === 200) {
        setUserData({ firstname: response.data.firstname, lastname: response.data.lastname, balance: response.data.balance });
        navigate("/dashboard");
      }
      else{
        navigate("/signin");
      }
    }
    catch (err) {
      console.log(`Error in the frontend while checking that user is already loged in or not? ${err}`);
      navigate("/signin");
    }
  }
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className='m-0 p-0 bg-slate-200 h-screen w-screen overflow-auto'>
      <UserContext.Provider value={{ setUserData, userData }}>
        <Header />
        <Outlet />
      </UserContext.Provider>
    </div>
  )
}

export default App;
