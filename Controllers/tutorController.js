import { generateZoomLink } from "./zoomService";
import Meeting from "./models/Meeting";

// Create meeting
const createMeeting = async (req, res) => {
  const { tutorId, studentId, unit, dateTime } = req.body;

  try {
    // Generate Zoom meeting link
    const zoomLink = await generateZoomLink(dateTime);

    // Save meeting to the database
    const newMeeting = new Meeting({
      tutorId,
      studentId,
      unit,
      dateTime,
      zoomLink,
    });
    await newMeeting.save();

    // Return the meeting details to the frontend
    res.status(200).json({ meeting: newMeeting });
  } catch (error) {
    res.status(500).json({ error: "Error creating meeting" });
  }
};

// Get meetings for tutor and student
const getMeetings = async (req, res) => {
  const { userId } = req.params;

  try {
    const meetings = await Meeting.find({
      $or: [{ tutorId: userId }, { studentId: userId }],
    });

    res.status(200).json({ meetings });
  } catch (error) {
    res.status(500).json({ error: "Error fetching meetings" });
  }
};

export { createMeeting, getMeetings };
