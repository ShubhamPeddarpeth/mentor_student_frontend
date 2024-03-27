import React, { useContext, useState, useEffect } from "react";
import { AssignMentorsContext } from "../Context/AssignMentors";

function MentorTable() {
  const [mentors] = useContext(AssignMentorsContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching mentors data (replace this with your actual data fetching logic)
        // const response = await fetch("API_URL");
        // const data = await response.json();
        // setMentors(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching mentors data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!mentors || mentors.length === 0) {
    return <div>No mentors available.</div>;
  }

  return (
    <div>
      <h3 className="text-info">Mentor List</h3>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Course</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor._id}>
              <td>{mentor.name}</td>
              <td>{mentor.email}</td>
              <td>{mentor.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MentorTable;
