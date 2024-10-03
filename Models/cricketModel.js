import mongoose from "mongoose";

const cricketSchema = new mongoose.Schema({
    teamA: {
        type: String,
        required: true,
    },
    teamB: {
        type: String,
        required: true,
    },
    winners: {
        type: String,
    },
    scores: {
        teamA: {
            type: Number,
            default: 0
        },
        teamB: {
            type: Number,
            default: 0
        }
    },
    wickets: {
        teamA: {
            type: Number,
            default: 0
        },
        teamB: {
            type: Number,
            default: 0
        }
    },
    overs: {
        teamA: {
            type: Number,
            default: 0
        },
        teamB: {
            type: Number,
            default: 0
        }
    },
    isLive: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Cricket', cricketSchema);
