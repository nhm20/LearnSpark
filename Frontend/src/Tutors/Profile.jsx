import React from "react";

const Profile = ({ tutor }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Tutor Profile</h2>
      <div className="mt-4">
        <p>
          <strong>Name:</strong> {tutor.name}
        </p>
        <p>
          <strong>Email:</strong> {tutor.email}
        </p>
        <p>
          <strong>Subjects:</strong> {tutor.subjects.join(", ")}
        </p>
        <p>
          <strong>Experience:</strong> {tutor.experience} years
        </p>
      </div>
    </div>
  );
};

export default Profile;
