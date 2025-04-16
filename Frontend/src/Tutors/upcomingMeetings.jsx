import React, { useEffect, useState } from "react";
import axios from "axios";

const UpcomingMeetings = ({ tutorId }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`/api/getMeetings/${tutorId}`);
        setMeetings(response.data.meetings);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [tutorId]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Upcoming Meetings</h2>
      <div className="mt-4">
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm mb-2"
            >
              <h3 className="text-xl font-medium">{meeting.unit}</h3>
              <p className="text-sm text-gray-500">
                Scheduled for: {new Date(meeting.dateTime).toLocaleString()}
              </p>
              <a
                href={meeting.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Join Meeting
              </a>
            </div>
          ))
        ) : (
          <p>No upcoming meetings.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingMeetings;
