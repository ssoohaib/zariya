
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

        app.use('/',require('./Routes/AdminRoutes'))
        app.use('/',require('./Routes/AuthUserRoutes'))
        app.use('/',require('./Routes/GeneralRoutes'))
        app.use('/',require('./Routes/DonorRoutes'))
        app.use('/',require('./Routes/RecipientRoutes'))
        app.use('/payments',require('./Routes/PaymentRoutes'))
        
        app.listen(PORT,()=>{console.log(`Port Active:${PORT}`)})
    }
)();