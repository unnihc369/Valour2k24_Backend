import Tournament from '../Models/tournamentModel.js';
import { io } from '../index.js'; 

export const createTournament = async (req, res) => {
    try {
        const { gameName, teams } = req.body;
       
        const newTournament = new Tournament({
            gameName,
            teams,
            rounds: [],
            currentRound: [],
            nextRound: [],
            champion: null,
        });

        await newTournament.save();

        // Emit event to all connected clients
        io.emit('tournamentCreated', newTournament);

        res.status(201).json(newTournament);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating tournament' });
    }
};

// Get all tournaments
export const getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        res.status(200).json(tournaments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching tournaments' });
    }
};

// Get a single tournament by ID
export const getTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }
        res.status(200).json(tournament);
    } catch (err) {
        //console.error(err);
        res.status(500).json({ message: 'Error fetching tournament' });
    }
};

// Update tournament (for winner updates and rounds progression)
export const updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        // Emit update to all clients
        io.emit('tournamentUpdated', tournament);

        res.status(200).json(tournament);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating tournament' });
    }
};

// Delete a tournament
export const deleteTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findByIdAndDelete(req.params.id);
        if (!tournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        // Emit deletion event
        io.emit('tournamentDeleted', { id: req.params.id });

        res.status(200).json({ message: 'Tournament deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting tournament' });
    }
};
