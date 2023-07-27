/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {FaShoppingCart } from 'react-icons/fa'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Ekartdisplay from "./Ekartdisplay"
import AddToCart from './component/Addtocart';
import "./Ekart.css"



function Ekartmain(props){
 
  
    const [value,setvalue]=useState("")
    const [content,setcontent]=useState([])
    const [categories,setcategories]=useState([])
    const [finalcount,setfinalcount]=useState()
    const [cartelement,setcartelement]=useState([])
 

    useEffect(() => {
        getcontent()
        getcategories();
    }, []);
  
    const getcontent = async () => {
        const src = await axios.get("https://dummyjson.com/products")
        setcontent(src.data.products)
    };
    const getcategories =async () =>{
        const cat = await axios.get("https://dummyjson.com/products/categories/")
        setcategories(cat.data)
    }
    const getserchcontent = async (value)=>{
        var urls = "https://dummyjson.com/products/search?q="+value;
        const search = await axios.get(urls)
        setcontent(search.data.products)
    } 
    const changecategorie  =async(value) =>{
        var urls = "https://dummyjson.com/products/category/"+value;
        const search = await axios.get(urls)
        setcontent(search.data.products)
    }
    
    const changecount = async (count)=>{
        setfinalcount(count)
    }
   

    const submit = async(e)=>{
        e.preventDefault();
        getserchcontent(value)   
    }

    const changeinInput = async (e)=>{
        setvalue(e.target.value)
    }
    
    const cartelements = async (CartItems)=>{
      setcartelement(CartItems)
      
    }
  
    return (
      <Router>
      <div>
      <nav className= " text-center navbar px-5 bg1 sticky " id="navbar">
      <div className="container">
        <div className="row">
          <div className="col tf">
            <Link to="/" className="navbar-brand d-flex" >
              <img src="https://s3.amazonaws.com/thumbnails.venngage.com/template/fc8535df-be09-4c80-8ea5-a69a34b2318e.png" width="50" height="50" className="float-left" alt=""/>
              <h2 className='mx-2 logo'>Ekart</h2>
              </Link>
          </div>
          <div className="col">
            <form className="form" onSubmit={submit}>
              <i className="fa fa-search" ></i>
              <input className="form-control form-input m-2" value={value}  type="text" placeholder="Search" onChange={changeinInput}></input>
              <button class="btn btn-success m-2" type="submit">  Search </button>
            </form>
          </div>
          <div className="col tr" >
            <Link to="/cart" ><FaShoppingCart color='white' size={35} /><span className="badge badge-warning float-right">{finalcount}</span></Link>
          </div>
        </div>
      </div>
      </nav>
      <Routes >
        <Route exact path='/' element={<Ekartdisplay  changecount={changecount} changecategorie={changecategorie} cartelements={cartelements} Content={content} categories={categories}/>}></Route> 
        <Route exact path='/cart' element={< AddToCart cartUpdate={changecount} cartelement={cartelement}/>}></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default Ekartmain;