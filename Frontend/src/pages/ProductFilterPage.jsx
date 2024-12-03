import React, { useEffect, useState } from "react";
import { ProductContainer,CheckBox ,filterProduct} from "../index";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductFilterPage = () => {
  const { filteredProducts ,searchProduct} = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [minPrice,setMinPrice]=useState()
  const [maxPrice,setMaxPrice]=useState()
  const [category,setCategory]=useState("")
  const [brand,setBrand]=useState("")
  const [rating,setRating]=useState()
  // const [minPrice,setMinPrice]=useState("")
useEffect(()=>{
  dispatch(filterProduct({minPrice,maxPrice:maxPrice>0?maxPrice:undefined,category,brand,rating,search:searchProduct}))
},[minPrice,maxPrice,category,brand,rating,searchProduct])

  return (
    <section className="flex justify-center">
      <div className="container  w-full grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-xl py-p-xxl px-p-xl sm:p-xxl">
        <div className="filterContainer p-p-md rounded-lg flex flex-col gap-p-md lg:w-[253px] lg:min-h-screen">
          {/* title */}
          <div className="title">
            <h4>Filter by:</h4>
          </div>

          {/* autual filters */}
          <div className="filters overflow-scroll lg:overflow-visible w-full flex lg:flex-col gap-xxl lg:gap-p-md">
                    {/* Price filter */}
            <div className="byPriceRange shrink-0">
              <h6 className="mb-m-xxs"> By Price Range</h6>

              <div className="priceRange flex flex-col gap-xxs" >

                <CheckBox children="$0 - $50" id="0" isChecked={minPrice===0&&maxPrice===50} onChange={()=>{
                  setMinPrice(0)
                  if(maxPrice==50){
                    setMaxPrice(0)
                  }
                  else{
                    
                    setMaxPrice(50)
                  }

                  }}/>
                <CheckBox children="$50 - $100" id="1" isChecked={minPrice===50&&maxPrice===100} onChange={()=>{
                  setMinPrice(50)
                  if(maxPrice==100){
                    setMaxPrice(0)
                  }
                  else{

                    setMaxPrice(100)
                  }
                  }} />
                <CheckBox children="$100 - $200" id="2" isChecked={minPrice===100&&maxPrice===200} onChange={()=>{
                  setMinPrice(100)
                  if(maxPrice==200){
                    setMaxPrice(0)
                  }
                  else{
                    setMaxPrice(200)
                  }
                    
                  }} />
                <CheckBox children="$200 - $500" id="3" isChecked={minPrice===200&&maxPrice===500} onChange={()=>{
                  setMinPrice(200)
                  if(maxPrice==500){
                    setMaxPrice(0)
                  }
                  else{

                    setMaxPrice(500)
                  }
                  }} />
                <CheckBox children="500 and above" id="4" isChecked={minPrice===500} onChange={()=>{
                  setMinPrice(500)
                  if(minPrice==500){
                    setMinPrice(0)
                  }
                  setMaxPrice(0)
                  }} />
              </div>
            </div>
                    {/* Category filter */}
            <div className="byCategory shrink-0">
              <h6 className="mb-m-xxs"> By Category</h6>

              <div className="categoryContainer flex flex-col gap-xxs">
                <CheckBox children="Electronics" isChecked={category==="electronics"} value="electronics" onChange={(e)=>{category==="electronics"?setCategory(""):setCategory("electronics")}} id="electronics" />
                <CheckBox children="Clothing" isChecked={category==="clothing"} value="clothing" onChange={(e)=>{category==="clothing"?setCategory(""):setCategory("clothing")}} id="clothing" />
                <CheckBox children="Shoes" isChecked={category==="shoes"} value="shoes" onChange={(e)=>{category==="shoes"?setCategory(""):setCategory("shoes")}} id="shoes" />
                <CheckBox children="Beauty" isChecked={category==="beauty"} value="beauty" onChange={(e)=>{category==="beauty"?setCategory(""):setCategory("beauty")}} id="beauty"/>
                <CheckBox children="Outdoors" isChecked={category==="outdoors"} value="outdoors" onChange={(e)=>{category==="outdoors"?setCategory(""):setCategory("outdoors")}}  id="outdoors" />
              </div>
            </div>

          

         

         

            {/* Rating filter */}
            <div className="byRating shrink-0">
              <h6 className="mb-m-xxs"> By Rating</h6>

              <div className="ratingContainer flex flex-col gap-xxs">
                <CheckBox children=" 1 Star" isChecked={rating===1} onChange={()=>{rating ===1 ? setRating(0) : setRating(1)}} id="star1"/>
                <CheckBox children="2 Stars" isChecked={rating===2} onChange={()=>{rating ===2 ? setRating(0) : setRating(2)}} id="star2"/>
                <CheckBox children="3 Stars" isChecked={rating===3} onChange={()=>{rating ===3 ? setRating(0) : setRating(3)}} id="star3"/>
                <CheckBox children="4 Stars" isChecked={rating===4} onChange={()=>{rating ===4 ? setRating(0) : setRating(4)}} id="star4"/>
                <CheckBox children="5 Stars" isChecked={rating===5} onChange={()=>{rating ===5 ? setRating(0) : setRating(5)}} id="star5"/>
                </div>
                </div>
          </div>
        </div>

        <div className="content  ">
            <div className="productContainer py-p-xxl place-items-center gap-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product)=>(
               <ProductContainer key={product._ic} name={product.name} img={product.image} id={product._id} discountedPrice={product.discountPrice} originalPrice={product.price} rating={product.rating} onClick={()=>{navigate(`/product/${product._id}`)}} />
            ))}

            </div>
        </div>

      </div>
    </section>
  );
};

export default ProductFilterPage;
