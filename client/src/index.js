import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./views/Home/Home";
import Signup from "./views/Signup/Signup";
import Login from "./views/Login/Login";
import Order from "./views/Order/Order";
import Buypage from "./views/Buypage/Buypage";

import './index.css';

const router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    },
    {
        path:'/signup',
        element: <Signup/>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/orders',
        element:<Order/>
    },
    {
        path:'/buy/:id',
        element:<Buypage/>
    }
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router= {router} />);
