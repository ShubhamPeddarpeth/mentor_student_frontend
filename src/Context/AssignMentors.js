import React, { useState, useEffect } from "react";
import axios from "axios";

export const AssignMentorsContext = React.createContext();

export const AssignMentorProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const BaseURL = `https://mentor-student-backend-l3ea.onrender.com`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mentorsResponse = await axios.get(`${BaseURL}/Mentors`);
        setMentors(mentorsResponse.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }

      try {
        const studentsResponse = await axios.get(`${BaseURL}/Students`);
        setStudents(studentsResponse.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated Students:", students);
  }, [students]);

  return (
    <AssignMentorsContext.Provider
      value={[mentors, setMentors, students, setStudents]}
    >
      {children}
    </AssignMentorsContext.Provider>
  );
};
