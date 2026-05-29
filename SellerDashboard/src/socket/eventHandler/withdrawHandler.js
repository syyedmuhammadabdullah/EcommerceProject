import {updateTransactionStatus} from "../../store/Slices/transactionSlice/transactionSlice";

const withdrawHandler = (socket, dispatch) => {

    socket.on("withdrawStatusUpdate", ({ transactionId, status }) => {
        dispatch(updateTransactionStatus({ transactionId, status }));
    });
    
    return () => socket.off("withdrawStatusUpdate");
};
export default withdrawHandler;