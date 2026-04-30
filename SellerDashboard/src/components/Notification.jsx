import React, { useEffect } from 'react'
import Button from './Button'
import { useSelector,useDispatch } from 'react-redux'
import {markAllNotificationAsRead,markNotificationAsRead,getNotifications,useNotificationClick,clearAllNotifications} from '../index'
import { useNavigate } from 'react-router-dom'
const Notification = () => {
  const {notifications,loading} = useSelector((state) => state.notifications);
  const {seller:{_id:sellerId}}=useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    
      if (notifications?.length === 0) {
        dispatch(getNotifications({sellerId}));
    }
  }, [dispatch, sellerId]);

    const handleMarkAsRead = (notification) => { 
      
      if (notification.isRead) return useNotificationClick(notification,navigate);
        dispatch(markNotificationAsRead(notification._id));
         useNotificationClick(notification,navigate);
    }

    const handleMarkAllAsRead = () => {
        dispatch(markAllNotificationAsRead(sellerId));
    }

    const handleClearAll = () => {
        dispatch(clearAllNotifications(sellerId));
    }

  return (
    <div className='max-h-[500px] right-[20px] top-[80px] w-[300px] bg-white  absolute rounded-md lg:top-[35px] lg:right-[50px] z-50 flex flex-col justify-between overflow-scroll no-scrollbar'>
        <div>
            
        <h1 className='text-black text-lg font-semibold p-sm'>Notifications</h1>
        <div className='Notification-Area overflow-scroll no-scrollbar h-full my-p-xs'>

       {loading ? <p className='text-black text-center'>Loading...</p> : notifications?.length === 0 ? <p className='text-black text-center'>No notifications</p> : notifications?.map((notification) => (
        <div onClick={() => handleMarkAsRead(notification)} className="notificationItem p-sm text-black border-t border-gray-300" key={notification._id}>
            <h5 className='font-semibold'>{notification.title} {notification.isRead ? "" : <span className='text-red-600'>New</span>}</h5>
            <p className='text-sm'>{notification.message}</p>
        </div>
       ))}
        
        </div>
        </div>

     {notifications?.length > 0&&   <div className='p-sm sticky bottom-0 text-center text-black bg-white border-t border-gray-300 flex justify-between'>
           
           <Button children="Clear All" onClick={handleClearAll} />
  
           <Button children="Mark All as Read" onClick={handleMarkAllAsRead}/>
        </div>     }   

    </div>
  ) 
}

export default Notification