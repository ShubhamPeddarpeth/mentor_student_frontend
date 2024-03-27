import React, { useState, useContext } from "react";
import axios from "axios";
import { AssignMentorsContext } from "../Context/AssignMentors";

function ShowMentorStudents() {
  const [mentors] = useContext(AssignMentorsContext);
  const [mentor, setMentor] = useState("");
  const [studList, setStudList] = useState([]);
  const [error, setError] = useState(null); // State to store error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://mentor-student-backend-jft8.onrender.com/Students/mentor-students/${mentor}`
      );
      setStudList(response.data);
      setError(null); // Clear any previous error message
    } catch (error) {
      console.error("Error fetching mentor students:", error.message);
      setError("Error fetching mentor students. Please try again."); // Set error message for display
      setStudList([]); // Clear student list in case of error
    }
  };

  return (
    <div>
      <h4 className="text-info">Students List based on Mentor Selection</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="mentor" className="form-label">
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
              return <option value={mentor._id}>{mentor.name}</option>;
            })}
          </select>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Show
        </button>
      </form>
      {error && <div className="text-danger">{error}</div>}{" "}
      {/* Display error message if exists */}
      {studList.length ? (
        <>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Batch</th>
              </tr>
            </thead>
            <tbody>
              {studList.map((student) => {
                return (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.batch}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShowMentorStudents;
