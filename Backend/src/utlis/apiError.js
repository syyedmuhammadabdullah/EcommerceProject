
class apiError extends Error {
    constructor(statusCode,message="Something went wrong",errors=[],stack="") {	
        super(message);
        this.status = statusCode;
        this.data=null
        this.message = message;
        if (stack) {
            this.stack = errors;
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}
export{apiError}