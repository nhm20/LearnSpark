import Subject from "../Models/subjectModel.js";

export const getAllSubjects = async (req, res) => {
  try {
    res.status(200).json(await Subject.find());
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects", error });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subject", error });
  }
};

export const createSubject = async (req, res) => {
  try {
    res
      .status(201)
      .json(
        await new Subject({ name: req.body.name, class: req.body.class }).save()
      );
  } catch (error) {
    res.status(500).json({ message: "Error creating subject", error });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSubject)
      return res.status(404).json({ message: "Subject not found" });
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: "Error updating subject", error });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject)
      return res.status(404).json({ message: "Subject not found" });
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subject", error });
  }
};
