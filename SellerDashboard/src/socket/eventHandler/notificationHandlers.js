import { addNotification } from "../../store/Slices/notificationSlice/notificationSlice";



export const handleNotification = (
   socket,
   dispatch
) => {

   socket.on("notification",(notification)=>{

      dispatch(addNotification(notification));
      return ()=> socket.off("notification");
   });

};