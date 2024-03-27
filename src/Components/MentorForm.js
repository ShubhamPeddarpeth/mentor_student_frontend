import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AssignMentorsContext } from "../Context/AssignMentors";

function MentorForm() {
  const [mentors, setMentors] = useContext(AssignMentorsContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the request is initiated
    try {
      const response = await axios.post(
        `https://mentor-student-backend-jft8.onrender.com/Mentors`,
        { name, email, course }
      );
      setMentors([...mentors, response.data]);
      setName("");
      setEmail("");
      setCourse("");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      console.error("Error posting mentor:", error.message);
      setErrorMessage("Error posting mentor. Please try again."); // Set error message for display
    } finally {
      setLoading(false); // Set loading state to false when the request is completed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="text-info">Mentor Form</h4>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Mentor Name<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="course" className="form-label">
          Course<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="text-info">Submitting...</div>
      ) : (
        <>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          <button type="submit" className="btn btn-primary mb-3">
            Submit
          </button>
        </>
      )}
    </form>
  );
}

export default MentorForm;
