import { addNotification } from "../../store/Slices/notificationSlice/notificationSlice";
import notificationSound from "../../assets/sounds/notification.mp3";


export const handleNotification = (
   socket,
   dispatch
) => {

   socket.on("notification",(notification)=>{

      dispatch(addNotification(notification));
      playNotificationSound();
      return ()=> socket.off("notification");
   });

};
const playNotificationSound = () => {
   const audio = new Audio(notificationSound);
   audio.play();
};