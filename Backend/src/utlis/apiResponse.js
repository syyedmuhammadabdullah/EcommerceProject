class apiResponse{
    constructor(statusCode,message="Success",data,total=0){
        this.totalCount=total
        this.statusCode=statusCode
        this.message=message
        this.data=data 
        this.success=statusCode< 400
    }
}

export {
    apiResponse
}