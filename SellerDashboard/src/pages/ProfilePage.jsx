import React,{useEffect, useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '../index'
import { UploadOutlined } from '@ant-design/icons';

const ProfilePage = () => {
    const inputRef=useRef(null);
    const [bannerImage,setBannerImage]=useState()

    const handleClick=()=>{
        console.log(inputRef.current);
        if (inputRef.current) {
            inputRef.current.click()
        }
    
    }
    const handleBannerUpload=(e)=>{
        const file=e.target.files[0] || e.dataTransfer.files[0];
        setBannerImage(file)
    }

    const handleDrag=(e)=>{
        e.preventDefault();
        e.stopPropagation();
    }
    const handleDrop=(e)=>{
        e.preventDefault();
        handleBannerUpload(e);
    }
    useEffect(()=>{
        console.log("the image is ",bannerImage);
    },[bannerImage,setBannerImage])

    return (
        <section className="flex justify-center">
          <div className="container max-w-screen-xl lg:gap-xxl  grid gap-xl px-p-md lg:p-p-xxl">
            <div className="top-menu ">
            <div className="title ">
              <h4>Store Details</h4>
            </div>
           
    
            </div>
    
          
            <div className="content w-full overflow-scroll no-scrollbar">
    
           <div className="banner flex flex-col gap-xs">

            <div className="name">
                <h5>Background Image</h5>
            </div>
            <div onClick={handleClick} onDragOver={handleDrag} onDrop={handleDrop} className="upload cursor-pointer bg-[#00000005] flex flex-col items-center justify-center gap-md h-[146px] border-dashed border border-border-primary rounded-md ">
            <div className="icon">
                <UploadOutlined className='text-xxl text-primary-base'/>
            </div>
            <Input type="file" className="hidden" divClassName="hidden" onChange={handleBannerUpload} ref={inputRef}/>
            <div className="text text-center">
                <p className='text-md'>Click or drag file to this area to upload</p>
                <p className='text-text-secondary'>Support for a single upload only.</p>
            </div>
            </div>
            
           </div>
           {/* <Input type="file" placeHolder="upload" onChange={(e)=>setBannerImage(e.target.files[0])}/> */}
            
            </div>
          </div>
        </section>
      );
}

export default ProfilePage