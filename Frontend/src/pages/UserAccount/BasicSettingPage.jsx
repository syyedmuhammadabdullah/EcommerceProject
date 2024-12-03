import React, { useEffect, useState } from 'react'
import {Button, Input, SelectMenu,updateUserAvatar,updateUserBasicInfo} from '../../index'
import { useSelector,useDispatch } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'

const BasicSettingPage = () => {
    const {loading,user}=useSelector(state=>state.auth)
    
    const [fullName, setFullName] = useState("")
    const [username, setUsername] = useState("")
    const [gender, setGender] = useState("Other")
    const [dob, setDob] = useState("")

     const dispatch=useDispatch()

        useEffect(()=>{
            setFullName(user?.fullName)
            setUsername(user?.username)
            setGender(user?.gender)
            setDob(user?.dateOfBirth)
        },[user,loading])


    const handleAvatarUpload=(e)=>{
        const selectedAvatar=e.target.files[0];
        if (selectedAvatar) {
            const formData=new FormData()
            formData.append("avatar",selectedAvatar)
            console.log(formData.get("avatar"));
            dispatch(updateUserAvatar(formData))
        }
    }



    const handleSubmit=(e)=>{
        e.preventDefault()
        dispatch(updateUserBasicInfo({
            fullName,
            username,
            gender,
            dob
        }))
    }


    return (
    <section className='flex justify-center'>
 {loading ? <TailSpin/> :(
        <div className="container w-full flex flex-col gap-xl py-p-xxl px-p-xl sm:p-xxl">
            <div className="title">
                <h3>Basic Settings</h3>
            </div>

            <div className="avatar grid place-items-center w-full gap-md ">
                <img className='w-[144px] h-[144px] rounded-full' src={user?.avatar? user?.avatar:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="avatar" />

                    <div className="uploadImage">
                        <Input type="file" placeholder="Upload Image" onChange={handleAvatarUpload}/>
                        </div>

            </div>

            <div className="title">
                <h3>User Details</h3>
            </div>

           <form >
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-md'>

        
                <div>
                    <label htmlFor="fullName">Full Name</label>
           <Input type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="First Name" name="fullName" id="fullName"/>
                </div>
           <div>
           <label htmlFor="username">User Name</label>
           <Input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} id="username" name="username"/>
           </div>

            <div className='flex gap-xs items-center'>
            <label htmlFor="gender" >Gender</label>
           <SelectMenu defaultValue={gender} onClick={(gender)=>{setGender(gender)}} options={["Female","Male","Other"]} className='py-p-xs'/>
            </div>
            <div className=''>
            <label htmlFor="dob">Date of birth</label>
           <Input type="date" value={dob} placeholder="11 july 2002" onChange={(e)=>setDob(e.target.value)} name="dob" id="dob"/>
            </div>
           
           <Button children='Update' type="submit" onClick={handleSubmit} className='bg-primary-base py-p-xs rounded-md text-lg lg:col-span-2 text-white '/>
           
            </div>
           </form>
            </div>
            )}
    </section>
    
  )
}

export default BasicSettingPage