import Class from "../Models/classModel.js";

export const getAllClasses = async (req, res) => {
  try {
    res.status(200).json(await Class.find());
  } catch (error) {
    res.status(500).json({ message: "Error fetching classes", error });
  }
};

export const getClassById = async (req, res) => {
  try {
    const classData = await Class.findById(req.params.id);
    if (!classData) return res.status(404).json({ message: "Class not found" });
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching class", error });
  }
};

export const addClass = async (req, res) => {
  try {
    res.status(201).json(
      await new Class({
        name: req.body.name,
        subjects: req.body.subjects,
      }).save()
    );
  } catch (error) {
    res.status(500).json({ message: "Error adding class", error });
  }
};

export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass)
      return res.status(404).json({ message: "Class not found" });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: "Error updating class", error });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass)
      return res.status(404).json({ message: "Class not found" });
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
};
