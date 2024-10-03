import Tennis from '../Models/tennisModel.js';
import { io } from '../index.js'; 

export const addTennis = async (req, res) => {
    try {
        const {  round, teamA, teamB } = req.body;
        if ( !round || !teamA || !teamB ) {
            return res.status(400).json({ message: "Missing required fields or invalid data" });
        }
        const match = await Tennis.create(req.body);
        res.status(201).json(match);

        // Emit an event for match creation
        io.emit('tennisMatchCreated', match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllTennis = async (req, res) => {
    try {
        const matches = await Tennis.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getTennisById = async (req, res) => {
    const { id } = req.params;
    try {
        const match = await Tennis.findById(id);
        if (!match) {
            return res.status(404).json({ message: "Tennis match not found" });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTennis = async (req, res) => {
    const { id } = req.params;
    try {
        const match = await Tennis.findByIdAndDelete(id);
        if (!match) {
            return res.status(404).json({ message: "Tennis match not found" });
        }
        res.status(200).json({ message: 'Tennis match deleted successfully', match });

        // Emit an event for match deletion
        io.emit('tennisMatchDeleted', match._id);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const editTennis = async (req, res) => {
    const { id } = req.params;
    try {
        const match = await Tennis.findByIdAndUpdate(id, req.body, { new: true });
        if (!match) {
            return res.status(404).json({ message: "Tennis match not found" });
        }
        res.status(200).json(match);

        // Emit an event for match update
        io.emit('tennisMatchUpdated', match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const editScores = async (req, res) => {
    try {
        const { matchId, team, score } = req.body;
        const match = await Tennis.findById(matchId);
        if (!match) {
            return res.status(400).json({ message: "Invalid match ID" });
        }
        match.scores[team] = score;
        await match.save();
        res.status(200).json(match);

        // Emit an event for score update
        io.emit('tennisScoreUpdated', match);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
