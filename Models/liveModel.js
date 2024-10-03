import mongoose from "mongoose";

const LiveSchema = new mongoose.Schema({
    gameName:{
        type:String,
        required:true,
    },
    round:{
        type:Number,
        required:true
    },
    winners:{
        type:String,
    },
    teamA:{
        type:String,
        required:true
    },
    teamB:{
        type:String,
        required:true
    },
    isLive:{
        type:Boolean,
        required:true
    },
    group:{
        type:String,
    }
});

export default mongoose.model('Live', LiveSchema);

