
import { handleNotification } from "./eventHandler/notificationHandlers";
import orderHandler from "./eventHandler/orderHandler";
import withdrawHandler from "./eventHandler/withdrawHandler";
export const initializeSocketListeners = ({
   socket,
   dispatch
})=>{

   handleNotification(socket,dispatch);
   withdrawHandler(socket,dispatch);
   orderHandler(socket,dispatch);
};