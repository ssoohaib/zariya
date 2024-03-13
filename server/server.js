const express=require('express')
const cors=require('cors')
const connectDB=require('./db/conn')
const bodyParser=require('body-parser')
const app=express()

app.use(bodyParser.json())
app.use(cors({origin:'*'}))

const PORT=5000;
(
    async ()=>{
        await connectDB()

        // app.use('/admin',require('./Routes/AdminRoutes'))
        app.use('/',require('./Routes/AuthUserRoutes'))
        app.use('/',require('./Routes/GeneralRoutes'))
        app.use('/',require('./Routes/DonorRoutes'))
        
        app.listen(PORT,()=>{console.log(`Port Active:${PORT}`)})
    }
)();