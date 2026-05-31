// import {updateTransactionStatus} from "../../store/Slices/transactionSlice/transactionSlice";
import {addTransaction} from "../../store/Slices/TransactionSlice/transactionSlice";
const withdrawHandler = (socket, dispatch) => {

    socket.on("newWithdrawalRequest", (transaction) => {
        console.log("withdraw request received",transaction);
        
        dispatch(addTransaction(transaction));
        return () => socket.off("newWithdrawalRequest");
    });
    
};
export default withdrawHandler;