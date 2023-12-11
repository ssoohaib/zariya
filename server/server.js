const express=require('express')
const cors=require('cors')
const connectDB=require('./db/conn')
const bodyParser=require('body-parser')
const app=express()

app.use(bodyParser.json())
app.use(cors({origin:'*'}))

app.get('/',(req,res)=>{
    res.send({lol:'lol'})
})

const PORT=5000;
(
    async ()=>{
        await connectDB()

        app.use('/admin',require('./Routes/AdminRoutes'))
        app.listen(PORT,()=>{console.log(`Port Active:${PORT}`)})
    }
)();