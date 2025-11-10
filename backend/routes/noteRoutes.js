import express from "express";
import notesModel from "../models/notesModel.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const id = req.user._id;

    const notes = await notesModel.find({ createdBy: id });
    return res.json({
      notes: notes,
    });
  } catch (err) {
    console.log("error fetching user notes: " + err);
    return res.json(500).json({
      msg: "Server error fetching notes",
    });
  }
});

router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await notesModel.create({
      title: title,
      description: description,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      note: note,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Server error creating note",
    });
  }
});

//Get a single note with id

router.get("/:id", auth, async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.id);
    if (!note)
      return res.status(404).json({
        msg: "Note not found",
      });
    return res.status(201).json({
      note,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

//Update a note
router.put("/:id", auth, async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        msg: "No note found",
      });
    }

    if (note.createdBy._id.toString() !== req.user._id.toString()) {
      return res.json({
        msg: "Not authorized",
      });
    }

    note.title = title || note.title;
    note.description = description || note.description;

    const updatedNote = await note.save();
    return res.status(201).json({
      updatedNote,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

//Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        msg: "No note found",
      });
    }

    if (note.createdBy._id.toString() !== req.user._id.toString()) {
      return res.json({
        msg: "Not authorized",
      });
    }

    await note.deleteOne();
    return res.json({
      msg: "Note deleted suceessfully",
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

export default router;
