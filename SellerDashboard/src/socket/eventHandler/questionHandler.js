import {questionAdded} from "../../store/Slices/ProductQuestionSlice/productQuestionSlice";

const questionHandler = (socket, dispatch) => {

    socket.on("questionAdded", (question) => {
        console.log("runs twice");
        
        dispatch(questionAdded(question));
        return () => socket.off("questionAdded");
    });    
};
export default questionHandler;