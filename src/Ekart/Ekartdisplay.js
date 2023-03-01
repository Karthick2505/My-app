/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import  {useState} from 'react'
import SweetPagination from "sweetpagination"

function Ekartdisplay(props){
    const products= props.Content
    const categories = props.categories

    const [cartItm, setcartItm] = useState([])
    const [count,setcount] = useState([])

    const [Categorieitem,setCategorieitem] = useState();
    
    const updateButton = async (e) => {
        var items = cartItm;
        items.length<1
        ?
        fetch('https://dummyjson.com/carts/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    products: [
      {
        id: e.target.value,
        quantity: 1,
      }
    ]
  })
})
.then(res => res.json())
.then(console.log)
        :
        fetch('https://dummyjson.com/carts/1', {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            merge :true,
              products: [
                {
                  id: e.target.value,
                  quantity: 1,
                },
              ]
            })
          })
          .then(res => res.json())
          .then(console.log);

        items.push(parseInt(e.target.value));
        items = checkIfDuplicateExists(items)
        setcartItm(items)
        props.changecount(items.length)
        
    }

    const categorielink = async (cat) => {
        setCategorieitem(cat)
        props.changecategorie(Categorieitem)   
    }


    function checkIfDuplicateExists(arr) {
        return arr.filter((item,index) => arr.indexOf(item) === index);
    }
  
    return (
    <div className='mt'>
        <div className="sidebar">
            {
                categories.map((cat) =>{
                    return (<><a className="active" value={cat} onClick={ () => categorielink(cat) }>{cat}</a></>)
                })
        
            }
        </div>
   
    <div className='content'>
    {products.length > 0
        ? 
    <div className="row">
        {
        count.map((val)=>{
            return (<>
            <div className="col-sm-4">
                <div className="card my-3 rounded-bottom">
                    <img className="card-img-top height" src={val.thumbnail}></img>
                    <div className="discount">%{val.discountPercentage}</div>
                    <div className="card-body card-color text-center">
                        <h3 className="title">{val.title}</h3>
                        <div className="text-price">RS.{val.price}
                            {'  '}<span className="text-stocks">stock   <span className="stock-count"><strong>"{val.stock}"</strong></span></span>
                        </div><br></br>
                        <button className="btn btn-light" value={val.id} disabled={ cartItm.indexOf(val.id) >= 0 }  onClick={updateButton}>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </>)
        })}
      <SweetPagination
        currentPageData={setcount}
        dataPerPage={6}
        getData={products}
        navigation={true}
      />
    </div>
        :<h1 className='text-center ntg'>Nothing has been matched</h1>
      }
    

    </div>
    
    </div>);
}

export default Ekartdisplay;