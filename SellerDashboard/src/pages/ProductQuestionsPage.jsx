import { SearchOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import {Input, Button, getProductsQuestion,giveAnswerToQuestion} from '../index'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
const ProductQuestionsPage = () => {
    const dispatch = useDispatch();
    const {loading, error, productsQuestion } = useSelector((state) => state.productsQuestion);
    const [isReply, setIsReply] = useState("");
    const [answer,setAnswer] = useState("")
    const filters = ["All", "Replied", "Unreplied"];
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };
    useEffect(() => {
        dispatch(getProductsQuestion({filter:selectedFilter,search,page:1,limit:10}))
        
    },[search,selectedFilter]);

    const handleReply=(id)=>{
        dispatch(giveAnswerToQuestion({productQuestionId:id,answer}))
        setIsReply("")
    }
  return (
    <section className="flex justify-center">
    <div className="container lg:gap-xxl grid gap-xl px-p-md lg:p-p-xxl">
      <div className="top-menu">
      <div className="title ">
        <h4>Product Questions</h4>
        <p>Add or manage your Product Questions</p>
      </div>
     

      </div>

      <div className="filter flex justify-between bg-white border-border-primary border p-p-sm rounded-md">
                <div className="options rounded-md flex-wrap border-border-primary overflow-scroll no-scrollbar flex w-fit">
                  {filters.map((filter,index) => (
                    <Button key={index}
                      children={filter}
                      onClick={() => handleFilterChange(filter.toLowerCase())}
                      className={`option ${selectedFilter === filter.toLowerCase() ? "bg-primary-base text-white" : "text-black"}  text-center  border-border-primary border px-p-md py-p-xxs`}
                    />
                  ))}
                </div>
                <div className="search">
                  <Input placeholder="Search"  onChange={(e) => setSearch(e.target.value)} value={search} icon={<SearchOutlined  />} />
                </div>
      </div>
      <div className="content border border-border-primary rounded-md w-full overflow-scroll no-scrollbar">

     
      <div className="data w-full grid gap-lg overflow-scroll no-scrollbar">
        
        <table className="w-[1200px] xl:w-full border-collapse  border-spacing-4 overflow-x-scroll xl:overflow-visible no-scrollbar">
          {/* Table Header */}
          <thead className="heading bg-gray-200 border border-border-primary">
            <tr className="h-[60px] ">
              <th>Customer Questions</th>
              <th>Customer Name</th>
              <th>Reply</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="ProductContainer text-center bg-white border border-border-primary">
 
             { productsQuestion?.map((product) => (
           <tr className="Product border-b-2" key={product?._id}>
           <td className='h-[120px] flex flex-col items-center justify-center gap-sm w-full '>
               <div className="c-question ">
               <p>{product?.question}</p>

               </div>
           <div className="p-details w-[360px]  flex gap-xs">
               <div className="img w-[70px] "><img src={product?.productId?.image} alt="img" /></div>
               <div className="name">
               <p>{product?.productId?.name.length>70 ? product?.productId?.name.slice(0,70)+"..." : product?.productId?.name}</p>
               </div>
           </div>
           </td>
           <td width={"300px"}>{product?.userId?.fullName}</td>
           {isReply===product._id? (<td>
            <Input placeholder="Answer" value={answer} onChange={(e)=>{setAnswer(e.target.value)}} />
            <Button children="Submit" onClick={()=>handleReply(product?._id)} className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm mr-2 text-white" />
           </td>
           ): <td width={"300px"}>{product?.answer ? product.answer :  <Button children="Reply" onClick={()=>{setIsReply(product._id)}} className="bg-primary-base w-fit px-p-md py-p-xxs rounded-sm mr-2 text-white" />}</td>}
           
          
           {/* <td >
           
            <Button children="Delete" onClick={""} className="bg-error-base w-fit px-p-md py-p-xxs rounded-sm text-white" />
           </td> */}
         </tr>
             ))}
                
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      
      <div className="pagination flex gap-xs">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
      </div>

      </div>
    </div>
  </section>
  )
}

export default ProductQuestionsPage