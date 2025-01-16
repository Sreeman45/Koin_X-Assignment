
import mongoose from "mongoose";
const cryptoSchema = new mongoose.Schema({
    id: {
        type:String,
        require:true
    },
    price: {
        type: Number,
        required: true

    },
    usd_market_cap: {
        type: Number,
        required: true

    },
    usd_24h_change: {
        type: Number,
        required: true

    },

   

},{timestamps:true})
const crypto=mongoose.model('crypto',cryptoSchema)
export default crypto;