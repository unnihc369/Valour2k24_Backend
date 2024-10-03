import Live from '../Models/liveModel.js';
import { io } from '../index.js';

export const addLive = async (req, res) => {
    try {
        let { gameName, round, winners, teamA, teamB, isLive, group } = req.body;

        if (gameName.toLowerCase().includes('chess')) {
            gameName = 'Chess';
        }

        if (!gameName || !round || !teamA || !teamB || typeof isLive !== 'boolean') {
            return res.status(400).json({ message: "Missing required fields or invalid data" });
        }

        const liveGame = await Live.create({ gameName, round, winners, teamA, teamB, isLive, group });
        res.status(200).json(liveGame);

        // Emit the event to notify clients about the new game
        io.emit('liveGameAdded', liveGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllLive = async (req, res) => {
    try {
        const liveGames = await Live.find();
        res.status(200).json(liveGames);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getLiveById = async (req, res) => {
    const { id } = req.params;
    try {
        const liveGame = await Live.findById(id);
        if (!liveGame) {
            return res.status(404).json({ message: "Live game not found" });
        }
        res.status(200).json(liveGame);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteLive = async (req, res) => {
    const { id } = req.params;
    try {
        const liveGame = await Live.findByIdAndDelete(id);
        if (!liveGame) {
            return res.status(404).json({ message: "Live game not found" });
        }
        res.status(200).json(liveGame);

        // Emit the event to notify clients about the deletion
        io.emit('liveGameDeleted', id);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const editLive = async (req, res) => {
    const { id } = req.params;
    try {
        let { gameName, round, winners, teamA, teamB, isLive, group } = req.body;

        // Normalize gameName to "Chess" if the input is "Chess1", "Chess2", etc.
        if (gameName.toLowerCase().includes('chess')) {
            gameName = 'Chess';
        }

        const liveGame = await Live.findByIdAndUpdate(id, { gameName, round, winners, teamA, teamB, isLive, group }, { new: true });
        if (!liveGame) {
            return res.status(404).json({ message: "Live game not found" });
        }
        res.status(200).json(liveGame);

        // Emit the event to notify clients about the update
        io.emit('liveGameUpdated', liveGame);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
