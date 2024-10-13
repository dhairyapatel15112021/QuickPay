import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { Signup } from './pages/signup/Signup.jsx';
import { Signin } from './pages/signin/Signin.jsx';
import { Dashboard } from './pages/dashboard/Dashboard.jsx';
import { SendMoney } from './pages/send/SendMoney.jsx';

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {path : "signup",element : <Signup/>},
      {path : "signin",element : <Signin/>},
      {path : "dashboard",element : <Dashboard/>},
      {path : "send",element : <SendMoney/>}
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
