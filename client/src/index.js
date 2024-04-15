import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from "./views/Home/Home.js";
import Signup from "./views/Signup/Signup.js";
import Login from "./views/Login/Login.js";
import Order from "./views/Order/Order.js";
import Buypage from "./views/Buypage/Buypage.js";
import './index.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
        path:'/order',
        element:<Order/>
    },
    {
        path:'/buy/:id',
        element:<Buypage/>
    }
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router= {router} />);
