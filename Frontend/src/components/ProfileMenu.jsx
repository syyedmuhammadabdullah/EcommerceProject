import React from 'react'
import {Button} from '../index'
import { Link } from 'react-router-dom'

const ProfileMenu = () => {
  return (
    <div className='ProfileMenu px-p-md z-20 py-p-xxl right-0 absolute bg-white'>
        <div className="profile flex flex-col gap-md">
            <div className="heading text-text-secondary"><h3>Account</h3></div>
            <div className="content flex gap-md flex-col">
               
               <Link to='/user-account'> <Button children="Your account" className='text-text-default '/></Link>
               <Link to='/order-history'> <Button children="Orders" className='text-text-default '/></Link>
               <Link to='/wishlist'> <Button children="Wishlist" className='text-text-default '/></Link>
              
                {/* <Button children="Currency"/>
                <Button children="Language"/> */}

            </div>
        </div>
    </div>
  )
}

export default ProfileMenu