
import { handleNotification } from "./eventHandler/notificationHandlers";
import orderHandler from "./eventHandler/orderHandler";
import withdrawHandler from "./eventHandler/withdrawHandler";
import questionHandler from "./eventHandler/questionHandler";
export const initializeSocketListeners = ({
   socket,
   dispatch
})=>{

   handleNotification(socket,dispatch);
   withdrawHandler(socket,dispatch);
   orderHandler(socket,dispatch);
   questionHandler(socket,dispatch);
};