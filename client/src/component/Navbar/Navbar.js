import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const storageUse = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(storageUse);
  }, []);

  return (
    <>
      <nav class="navbar navbar-expand-lg  p-3 nav ">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold fs-4" href="#">
              <span className="text-warning fst-italic fs-2 ">E-  </span> 
               <span className="text-danger pt-3 ">COMMERCE</span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse " id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-5 fs-4 ">
              <li class="nav-item ms-5 ">
                <Link to="/" class="nav-link active " aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link  to="/addtransaction" class="nav-link active" aria-current="page" href="#">
                    Order
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link  to="/showtransaction" class="nav-link active" aria-current="page" >
                    Signup
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link to="/Login" class="nav-link active" aria-current="page" >
                     Login
                </Link>
              </li>
              <li class="nav-item ms-5">
                <Link  to="/signup" class="nav-link active" aria-current="page" >
                    Signup
                </Link>
              </li>

            </ul>
              <div className="hello-user fs-5 me-5">
                        Hello , <span className="user">  {user?.name || 'User!'}</span>
                       
                       {
                        user?.name ? 
                         (<span className="navbar-logout" onClick={() =>{
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}>
                            Logout
                        </span>
                        ) : null
                       }
                    </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;