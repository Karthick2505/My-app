/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/style-prop-object */

import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddToCart(props){
   
    const [content,setcontent]=useState([])
    const [details,setdetails] =useState([])
 

    useEffect(() => {
        getcontent()
    }, []);
  
    const getcontent = async () => {
        const src = await axios.get("https://dummyjson.com/carts/1")
        setdetails(src.data)
        setcontent(src.data.products)
    };
        


    return (
        <div className='container'>
            <div className='row'>
                <h1>Shopping Cart</h1>
            </div>
             <div className="row">
                <div className="col-lg-7">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <p className="mb-0">You have {details.totalProducts} items in your cart</p>
                        </div>
                    </div>
                    {
        content.map((val)=>{
            return (
                    <div class="card my-4">
                        <div class="card-body d-flex">
                            <div className='col-lg-3'>
                                <img className='cartimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyZZoRTZyUqyVxnLSjKcIuezoIj8lfqZEgqg&usqp=CAU"></img>
                            </div>
                            <div className='col-lg-8'>
                                <h5 class="card-title">{val.title}</h5>
                                <p class="card-text">{val.price}</p>
                                <a href="#" class="btn btn-danger">Remove</a>
                            </div>
                        </div>
                    </div>
            )
        })}


                </div>


                <div className="col-lg-5">
                    <div className="card bg-primary text-white rounded-3 position-fixed">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
      <p className="mb-2">Subtotal</p>
      <p className="mb-2">{details.total}</p>
    </div>

    <div className="d-flex justify-content-between">
      <p className="mb-2">discountedTotal</p>
      <p className="mb-2">{details.discountedTotal}</p>
    </div>

    <div className="d-flex justify-content-between mb-4">
      <p className="mb-2">totalQuantity</p>
      <p className="mb-2">{details.totalQuantity}</p>
    </div>

    <button type="button" className="btn btn-info btn-block btn-lg">
      <div className="d-flex justify-content-between">
        <span>RS:{details.total} </span>
        <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
      </div>
    </button>

  </div>
</div>

                </div>
            </div>
        </div>
   
       

    
     

         

          


  



);
}

export default AddToCart;