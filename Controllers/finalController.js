import Final from "../Models/finalModel.js";
import { io } from '../index.js'; 

export const broadcastFinalUpdate = (event, data) => {
  io.emit(event, data); 
};

export const addFinal = async (req, res) => {
  try {
    const { gameName, winners, runners } = req.body;
    if (!gameName || !winners || !runners) {
      return res.status(400).json({ message: "Missing required fields or invalid data" });
    }

    const final = await Final.create(req.body);
    res.status(201).json(final);

    // Broadcast to all clients that a new final has been added
    broadcastFinalUpdate("finalAdded", final);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllFinal = async (req, res) => {
  try {
    const finals = await Final.find();
    res.status(200).json(finals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFinalById = async (req, res) => {
  const { id } = req.params;
  try {
    const final = await Final.findById(id);
    if (!final) {
      return res.status(404).json({ message: "Final not found" });
    }
    res.status(200).json(final);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editFinal = async (req, res) => {
  const { id } = req.params;
  try {
    const final = await Final.findByIdAndUpdate(id, req.body, { new: true });
    if (!final) {
      return res.status(404).json({ message: "Final not found" });
    }
    res.status(200).json(final);

    // Broadcast to all clients that a final has been updated
    broadcastFinalUpdate("finalUpdated", final);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFinal = async (req, res) => {
  const { id } = req.params;
  try {
    const final = await Final.findByIdAndDelete(id);
    if (!final) {
      return res.status(404).json({ message: "Final not found" });
    }
    res.status(200).json({ message: "Final deleted successfully" });

    // Broadcast to all clients that a final has been deleted
    broadcastFinalUpdate("finalDeleted", { id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};