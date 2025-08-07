import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({}).sort({createdAt:-1});//newest note comes first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: " Note not found" });
    }

    res.json(note);
  } catch (error) {
    console.error("Error in getById: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = await Note({ title, content });
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote: ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = req.params.id;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote: ", error);
    res.status(500).json({ message: "Intenal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote: ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
