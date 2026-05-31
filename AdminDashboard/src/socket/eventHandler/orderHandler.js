// import {addOrder} from "../../store/Slices/orderSlice/orderSlice";

const orderHandler = (socket, dispatch) => {

    socket.on("newOrder", (order) => {
        // dispatch(addOrder(order));
        return () => socket.off("newOrder");
    });
};
export default orderHandler;