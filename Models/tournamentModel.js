import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tournamentSchema = new mongoose.Schema({
    gameName: String,
    teams: [
        {
            name: String,
            status: { type: String, default: 'In' }
        }
    ],
    rounds: [[String]],
    currentRound: [[String]],
    nextRound: [String],
    champion: String
});

export default mongoose.model('Tournament', tournamentSchema);
