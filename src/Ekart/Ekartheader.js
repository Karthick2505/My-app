/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {FaShoppingCart } from 'react-icons/fa'
import { CLoadingButton } from '@coreui/react-pro'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import Ekartdisplay from "./Ekartdisplay"
import AddToCart from './component/Addtocart';



function Ekartheader(props){
    const [value,setvalue]=useState("")
    const [content,setcontent]=useState([])
    const [categories,setcategories]=useState([])
    const [finalcount,setfinalcount]=useState()
 

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
    
    window.onscroll = function() {myFunction()};

var navbar = document.getElementsByClassName("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
   
    
    return (
      <Router>
      <div>
      <nav className= " text-center navbar px-5 bg1">
      <div className="container">
        <div className="row">
          <div className="col">
            <Link to="/" className="navbar-brand" >
              <img src="https://s3.amazonaws.com/thumbnails.venngage.com/template/fc8535df-be09-4c80-8ea5-a69a34b2318e.png" width="50" height="50" className="d-inline-block align-top" alt=""/>
              </Link>
          </div>
          <div className="col">
            <form className="form" onSubmit={submit}>
              <i className="fa fa-search" ></i>
              <input className="form-control form-input" value={value}  type="text" placeholder="Search" onChange={changeinInput}></input>
              <CLoadingButton color="success my-2 my-sm-0" variant="outline" timeout={5} type="submit">  Search </CLoadingButton>
            </form>
          </div>
          <div className="col" >
            <Link to="/cart" ><FaShoppingCart color='white' size={35} /><span className="badge badge-warning">{finalcount}</span></Link>
          </div>
        </div>
      </div>
      </nav>
      <Routes>
        <Route exact path='/' element={<Ekartdisplay  changecount={changecount} changecategorie={changecategorie} Content={content} categories={categories}/>}></Route> 
        <Route exact path='/cart' element={< AddToCart />}></Route>
      </Routes>
    </div>
    </Router>

     
    );
}

export default Ekartheader;