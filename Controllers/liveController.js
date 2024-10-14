import Live from '../Models/liveModel.js';
import { io } from '../index.js';

export const addLive = async (req, res) => {
    try {
        let { gameName, round, winners, teamA, teamB, isLive, group } = req.body;

        console.log({ gameName, round, winners, teamA, teamB, isLive, group })

        if (!gameName || !round || !teamA || !teamB || typeof isLive !== 'boolean') {
            return res.status(400).json({ message: "Missing required fields or invalid data" });
        }

        const liveGame = await Live.create({ gameName, round, winners, teamA, teamB, isLive, group });
        res.status(200).json(liveGame);

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
        const updateData = {};
        const { gameName, round, winners, teamA, teamB, isLive, group } = req.body;
  
        if (gameName !== undefined) updateData.gameName = gameName;
        if (round !== undefined) updateData.round = round;
        if (winners !== undefined) updateData.winners = winners;
        if (teamA !== undefined) updateData.teamA = teamA;
        if (teamB !== undefined) updateData.teamB = teamB;
        if (isLive !== undefined) updateData.isLive = isLive;
        if (group !== undefined) updateData.group = group;

        const currentGame = await Live.findById(id);
        if (!currentGame) {
            return res.status(404).json({ message: "Live game not found" });
        }

        const updatedGame = await Live.findByIdAndUpdate(id, updateData, { new: true });

        if (winners != '' && currentGame.winners !== winners && winners!==undefined) {
            io.emit('winnerUpdated', updatedGame.winners);  // Emit winner update
        }
        // Emit updated game details to all connected clients
        io.emit('liveGameUpdated', updatedGame);

        res.status(200).json(updatedGame);
    } catch (error) {
        console.error("Error updating live game:", error);
        res.status(500).json({ message: error.message });
    }
};



