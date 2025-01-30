const mongoose=require('mongoose')
const {Schema}=mongoose;

const savingsSchema=new Schema({
    savings:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    hsitory:[{
        type: { type: String, enum: ['deposit', 'withdrawal'] },
        amount: Number,
        date: { type: Date, default: Date.now }
    }]
})

module.exports=mongoose.model('Savings',savingsSchema)