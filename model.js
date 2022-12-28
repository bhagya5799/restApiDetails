const mongoose = require('mongoose')


const RestApi = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    emailId:{
        type: String,

    }

})
module.exports = mongoose.model("restApi",RestApi)