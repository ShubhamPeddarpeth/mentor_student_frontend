import React, { useContext, useState, useEffect } from "react";
import { AssignMentorsContext } from "../Context/AssignMentors";
import axios from "axios";

function StudentTable() {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext);
  const [error, setError] = useState(null); // State to store error message

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://mentor-student-backend-jft8.onrender.com/Students"
        );
        setStudents(response.data);
        setError(null); // Clear any previous error message
      } catch (error) {
        console.error("Error fetching students:", error);
        if (error.response && error.response.status === 400) {
          setError("Bad request: Please check your input and try again.");
        } else {
          setError("Error fetching students. Please try again later.");
        }
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h3 className="text-info">Students List</h3>
      {error ? (
        <div className="text-danger">{error}</div> // Display error message if exists
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Batch</th>
              <th scope="col">Mentor</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const stud_mentor = mentors.find(
                (mentor) => mentor._id === student.mentor
              );
              return (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.batch}</td>
                  <td>{stud_mentor ? stud_mentor.name : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default StudentTable;
