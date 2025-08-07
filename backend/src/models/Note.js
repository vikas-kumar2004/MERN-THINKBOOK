import mongoose from "mongoose";

const noteSchem = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // createdAt, updatedAt

const Note = mongoose.model("Note", noteSchem);

export default Note;
