import mongoose from "mongoose";

const TennisSchema = new mongoose.Schema({
    gameName:{
        type:String,
        default:"Table Tennis",
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
    scores:{
        teamA:{
            type:Number,
            default:0
        },
        teamB:{
            type:Number,
            default:0
        }
    },
    group:{
        type:String,
    },
    isLive: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Tennis', TennisSchema);