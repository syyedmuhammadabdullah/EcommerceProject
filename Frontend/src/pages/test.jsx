import React,{useEffect, useState} from 'react'
import axios from 'axios'

function Test() {
    const [data,setData]=useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/api/v1/users/test",{
            withCredentials:true
        }).then(res=>{setData(res.data);console.log(res)}
        ).catch((err)=>console.log(err)
        )
        
    },[])
      return (
        <div>{data&& data.username}</div>
      )
}

export default Test