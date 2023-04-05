const mongoose=require('mongoose');

const DataSchema=new mongoose.Schema({
    uniqueId:{
        type: String,
        required :true,
        unique :true,
    },
    Name: {
        type: String,
        required :  true,
    },
    Age: {
        type : Number,
        required :true,
    }
});

const Food=mongoose.model("CustomerDetail",DataSchema)
module.exports =Food