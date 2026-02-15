import StudyMaterial from "./studyMaterial.model.js";

/* GET ALL MATERIALS */
export const getStudyMaterials = async (req, res) => {
  try {
    const { classLevel, subject } = req.query;

    const filter = {};
    if (classLevel) filter.classLevel = classLevel;
    if (subject) filter.subject = subject;

    const materials = await StudyMaterial.find(filter)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      materials,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
