import mongoose from "mongoose";

const FinalSchema = new mongoose.Schema({
    gameName:{
        type:String,
        required:true,
        unique:true
    },
    winners:{
        type:String,
        required:true
    },
    runners:{
        type:String,
        required:true
    },
    qualifiedTeams: {
        type: [String],
        required: true
    },
    isLive: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "final"
    }
},{
    timestamps:true
});

export default mongoose.model('Final', FinalSchema);