const { request, response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const RestApi = require('./model')
const app = express()
const cors = require('cors')

app.use(express.json())
const db="mongodb+srv://bhagyashree:bhagyashree@cluster0.szuwrtb.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(db).then(() => console.log('db connected')).catch((err) => console.log(err))


app.use(cors())


app.post('/getall', async(request,response) => {
    const {name,emailId} = request.body
    try{
        const newData = new RestApi({name,emailId})
        await newData.save()
        const resVal= await RestApi.find()
        response.send(resVal)
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(process.env.PORT || 3009, ()=> console.log('running'))