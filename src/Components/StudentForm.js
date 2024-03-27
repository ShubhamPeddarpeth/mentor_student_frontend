import React, { useState, useContext } from "react";
import axios from "axios";
import { AssignMentorsContext } from "../Context/AssignMentors";

function StudentForm() {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext);
  const [name, setname] = useState("");
  const [batch, setBatch] = useState("");
  const [assignmentor, setassignMentor] = useState("");
  const [error, setError] = useState(null); // State to store error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const posted_stud = await axios.post(
        `https://mentor-student-backend-jft8.onrender.com/Students`,
        { name, batch, mentor: assignmentor }
      );
      setStudents([...students, posted_stud.data]);
      setname("");
      setBatch("");
      setassignMentor("");
      setError(null); // Clear any previous error message
    } catch (error) {
      console.error("Error posting student:", error.message);
      setError("Error posting student. Please try again."); // Set error message for display
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-info">Student Form</h4>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Student Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="batch" className="form-label">
          Batch<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="batch"
          value={batch}
          onChange={(e) => {
            setBatch(e.target.value);
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="course" className="form-label">
          Mentor
        </label>
        <select
          className="form-control"
          aria-label="Default select example"
          value={assignmentor}
          onChange={(e) => {
            setassignMentor(e.target.value);
          }}
        >
          <option value=""></option>
          {mentors.map((mentor) => {
            return <option value={mentor._id}>{mentor.name}</option>;
          })}
        </select>
      </div>
      {error && <div className="text-danger">{error}</div>}{" "}
      {/* Display error message if exists */}
      <button type="submit" className="btn btn-primary mb-3">
        Submit
      </button>
    </form>
  );
}

export default StudentForm;
