import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MultiSelect from "multiselect-react-dropdown";
import { AssignMentorsContext } from "../Context/AssignMentors";

function AssignStudentsToMentor() {
  const [mentors, setMentors, students, setStudents] =
    useContext(AssignMentorsContext);
  const [mentor, setMentor] = useState("");

  const [options, setOptions] = useState([]);
  let arrayval = [];
  useEffect(() => {
    students.map(
      (student) =>
        (arrayval = [...arrayval, { name: student.name, value: student._id }])
    );
    setOptions(arrayval);
  }, [students]);

  let selectedOptions = [],
    removedOptions = [];
  const onSelect = (data) => {
    selectedOptions = data;
  };
  const onRemove = (data) => {
    removedOptions = data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract student IDs from selectedOptions or removedOptions
    const selectedStudentIds = (
      removedOptions.length ? removedOptions : selectedOptions
    ).map((student) => student.value);

    try {
      // Make PATCH request to assign mentor to selected students
      await axios.patch(
        `https://mentor-student-backend-jft8.onrender.com/Students/assign-mentor-students`,
        { mentor, studentIds: selectedStudentIds }
      );

      // Refresh student data after assignment
      const updatedStudentData = await axios.get(
        `https://mentor-student-backend-jft8.onrender.com/Students`
      );
      setStudents(updatedStudentData.data);
    } catch (error) {
      console.error("Error assigning students to mentor:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4 className="text-info">Assign Students to Mentor</h4>
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
        <div className="mb-3">
          <label htmlFor="students" className="form-label">
            Students<span style={{ color: "red" }}>*</span>
          </label>
          <div className="chat-container">
            <MultiSelect
              options={options}
              displayValue="name"
              onSelect={onSelect}
              onRemove={onRemove}
              style={{
                searchBox: {
                  background: "white",
                },
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignStudentsToMentor;
