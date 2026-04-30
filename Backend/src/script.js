import {connectDB,io} from "./index.js"

import { server } from "./utlis/socket.js";


connectDB().then(()=>{
    
    io.on("connection",socket=>{
        socket.on("joinRoom",userId=>{
            socket.join(userId);
         

        socket.on("disconnect",socket=>{
        })
    })
    })

    server.listen(process.env.PORT,"0.0.0.0",()=>{
        console.log("Server is running on port ",process.env.PORT);
    })


    })
.catch((error)=>{
    console.log("DB Connection error",error);
})



