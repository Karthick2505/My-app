/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect  }  from 'react'


function AddToCart(props){
   
    var contents = props.cartelement
    const[content,setcontent]=useState(contents)
    const[totalMaster,settotalmaster]=useState({"total_product": 0, "total_price": 0})
   
    var totalProduct = 0;
    var totalPrice = 0;

    useEffect(() => {
        totalProduct = 0;
        totalPrice = 0;
        updateValues();
    },[content]);

    const remove = async (e)=>{
        var elements =content
        elements = elements.filter(elements => elements[0].id !== e)
        setcontent(elements)
        props.cartUpdate(elements.length);
        updateValues();
    }

    const increment = async (e)=>{
        var elements = [...content];
        
        for (var i=0; i < elements.length; i++) {
           
            if(elements[i][0].id === e) {
                elements[i].qty = elements[i].qty + 1;
            } 
            
        }   
        setcontent(elements)
        updateValues();
    }

    const decrement =async (e)=>{
        var elements = [...content];
        for (var i=0; i < elements.length; i++) {
            if(elements[i][0].id === e ) {
                elements[i].qty = elements[i].qty - 1;
            } 
        }   
        setcontent(elements) 
        updateValues();
    }

    const updateValues = () => {

        content.map((value) => {
            var price = value[0].price;
            totalProduct +=  value.qty;
            totalPrice += price * value.qty;
        });
        settotalmaster({"total_product":totalProduct,"total_price":totalPrice});
    }
     


    return (
        <div className='container'>
            <div className='row'>
                <h1>Shopping Cart</h1>
            </div>
            <div className="row">
                <div className="col-lg-7">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <p className="mb-0">You have {content.length} items in your cart</p>
                        </div>
                    </div>
                    {
                    content.map((val)=>{
                    return (
                    <div class="card my-4">
                        <div class="card-body d-flex">
                            <div className='col-lg-3'>
                                <img className='cartimg' src={val[0].thumbnail}></img>
                            </div>
                            <div className='col-lg-6 text-center'>
                                <h3 class="card-title">{val[0].title}</h3>
                                <h5 class="card-text">RS:{val[0].price}</h5>
                                <button class="btn btn-danger" onClick={ () => remove(val[0].id) }>Remove</button>
                            </div>
                            <div  className='col-lg-3 text-center'>
                                <h4>Quantity</h4>
                                <h3>{val.qty}</h3>
                                <button class="btn btn-primary mx-2 px-4" onClick={ () => increment(val[0].id)}>+</button>
                                <button  class="btn btn-primary  mx-2 px-4" disabled={ val.qty  == 1 && true}onClick={ () => decrement(val[0].id)}>-</button>
                            </div>
                        </div>
                    </div>
                    )
                    })}
                </div>
                <div className="col-lg-5">
                    <div className="card  w-25 bg-primary text-white rounded-3 position-fixed">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p className="mb-2">Total products</p>
                                <p className="mb-2"> {totalMaster.total_product} </p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p className="mb-2">Sub Total</p>
                                <p className="mb-2">{totalMaster.total_price}</p>
                            </div>
                            <button type="button" className="btn btn-info btn-block btn-lg">
                                <div className="d-flex justify-content-between">
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