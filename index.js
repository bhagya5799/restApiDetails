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


app.get('/', async(request,response) => {
    try{
        return response.json(await RestApi.find())
    }
    catch(err){
        console.log(err.message)
    } 
})

app.get('/getOneData/:id', async(request,response) => {
    const {id} = request.params
    try{
        const idVal = await RestApi.findById(id)
        response.send(idVal)
    }
    catch(err){
        console.log(err.message)
    }

})

app.put('/updateVal/:id' , async(request,response) => {
    const {id} = request.params
    try{
        await RestApi.findOneAndUpdate({_id:id}, request.body)
        
    }
    catch(err){
        console.log(err.message)
    }
})


app.delete('/deleteVal/:id', async (request,response) => {
    const {id} = request.params.id
    try{
        await RestApi.findOneAndDelete(id)
        return response.json(await RestApi.find())
        
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(process.env.PORT || 3009, ()=> console.log('running'))