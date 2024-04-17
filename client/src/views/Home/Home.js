import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Home.css"
import Navbar from  "./../../component/Navbar/Navbar"
import Card from "./../../component/Card/Card"

function Home () {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState ('')
    
    const searchProducts = async () =>{
        if(search === ''){
            loadProducts();
            return;
        }

        const response = await axios.get(`products/search?q=${search}`);
        setProducts(response?.data?.data);
    }
    useEffect(()=>{
        searchProducts();
    })
    const loadProducts = async ()=>{
       try{
        const response = await axios.get("/products");
        setProducts(response?.data?.data);
       }
       catch(err){
        console.log(err);
        alert("Error loading products");
       }  
    };

    useEffect(()=>{
        loadProducts();
    },[])

    return(
        <div>
            <Navbar/>
            <input type='text' placeholder='Search' className='search-bar'
            value={search} 
            onChange={(e)=>{
                setSearch(e.target.value)
            }}/>
            <div className='main-container'>
          {
            products?.map(( product, index)=>{
                const {_id, name, description, price, image} = product;
                return(
                    <Card key={index}
                     name={name}
                     description={description} 
                     price={price}
                     image={image}
                     id={_id}
                     />
                )
            })
           }
          </div>
          
        </div>
    )
}

export default Home