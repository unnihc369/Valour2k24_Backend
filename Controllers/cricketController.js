import Cricket from '../Models/cricketModel.js';
import { io } from '../index.js'; // Ensure you import your socket.io instance

export const createMatch = async (req, res) => {
    try {
        const { teamA, teamB } = req.body;
        if (!teamA || !teamB) {
            return res.status(400).json({ message: "Invalid input" });
        }
        const match = await Cricket.create(req.body);
        res.status(201).json(match);

        // Emit an event for match creation
        io.emit('matchCreated', match);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllMatches = async (req, res) => {
    try {
        const matches = await Cricket.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMatchById = async (req, res) => {
    try {
        const match = await Cricket.findById(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateMatch = async (req, res) => {
    try {
        const match = await Cricket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json(match);

        // Emit an event for match update
        io.emit('matchUpdated', match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteMatch = async (req, res) => {
    try {
        const match = await Cricket.findByIdAndDelete(req.params.id);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        res.status(200).json({ message: 'Match deleted successfully' });

        // Emit an event for match deletion
        io.emit('matchDeleted', match._id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateScores = async (req, res) => {
    try {
        const { matchId, team, score, winners } = req.body;
        const match = await Cricket.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        match.scores[team] = score;
        await match.save();
        res.status(200).json(match);

        // Emit an event for score update
        io.emit('scoresUpdated', match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateWickets = async (req, res) => {
    try {
        const { matchId, team, wickets, winners } = req.body;
        const match = await Cricket.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        match.wickets[team] = wickets;
        await match.save();
        res.status(200).json(match);

        // Emit an event for wicket update
        io.emit('wicketsUpdated', match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateOvers = async (req, res) => {
    try {
        const { matchId, team, overs, winners } = req.body;
        const match = await Cricket.findById(matchId);
        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }
        match.overs[team] = overs;
        await match.save();
        res.status(200).json(match);

        // Emit an event for overs update
        io.emit('oversUpdated', match);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
