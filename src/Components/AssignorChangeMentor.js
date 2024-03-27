import React, { useState, useContext } from "react";
import axios from "axios";
import { AssignMentorsContext } from "../Context/AssignMentors";

function AssignorChangeMentor() {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext);
  const [student, setStudent] = useState("");
  const [mentor, setMentor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated_mentor = await axios.patch(
        `https://mentor-student-backend-jft8.onrender.com/Students/assign-mentor/${student}`,
        { mentor },
        console.log(updated_mentor)
      );
      // Update students data if the request is successful
      const stud_data = await axios.get(
        `https://mentor-student-backend-jft8.onrender.com/Students`
      );
      setStudents(stud_data.data);
      // Clear form fields and error message
      setStudent("");
      setMentor("");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error updating mentor:", error.message);
      // Set error message for display
      setErrorMessage("Error updating mentor. Please try again.");
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className="text-info">Change Mentor</h4>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Student<span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-control"
            aria-label="Default select example"
            value={student}
            onChange={(e) => {
              setStudent(e.target.value);
            }}
          >
            <option value=""></option>
            {students.map((student) => {
              return (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Mentor<span style={{ color: "red" }}>*</span>
          </label>
          <select
            className="form-control"
            aria-label="Default select example"
            value={mentor}
            onChange={(e) => {
              setMentor(e.target.value);
            }}
          >
            <option value=""></option>
            {mentors.map((mentor) => {
              return (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              );
            })}
          </select>
        </div>
        {errorMessage && <div className="text-danger">{errorMessage}</div>}{" "}
        {/* Display error message if exists */}
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignorChangeMentor;
