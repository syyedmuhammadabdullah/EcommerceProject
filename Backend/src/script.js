import {connectDB,app} from "./index.js"


connectDB().then(()=>{
    console.log("MongoDB connected")
    app.listen(process.env.PORT,"0.0.0.0",()=>{
        console.log(`server running on port ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log("DB Connection error");
})



