import Unit from "../Models/unitModel.js";

export const getAllUnits = async (req, res) => {
  try {
    res.status(200).json(await Unit.find());
  } catch (error) {
    res.status(500).json({ message: "Error fetching units", error });
  }
};

export const getUnitById = async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    if (!unit) return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Error fetching unit", error });
  }
};

export const createUnit = async (req, res) => {
  try {
    res
      .status(201)
      .json(
        await new Unit({
          name: req.body.name,
          description: req.body.description,
        }).save()
      );
  } catch (error) {
    res.status(500).json({ message: "Error creating unit", error });
  }
};

export const updateUnit = async (req, res) => {
  try {
    const updatedUnit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUnit)
      return res.status(404).json({ message: "Unit not found" });
    res.status(200).json(updatedUnit);
  } catch (error) {
    res.status(500).json({ message: "Error updating unit", error });
  }
};

export const deleteUnit = async (req, res) => {
  try {
    const deletedUnit = await Unit.findByIdAndDelete(req.params.id);
    if (!deletedUnit)
      return res.status(404).json({ message: "Unit not found" });
    res.status(200).json({ message: "Unit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting unit", error });
  }
};
