import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import './faculty.css'; // Import your CSS file

const Faculty = () => {
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  const batches = [
    { id: 'Batch 2021', name: 'Batch 2021' },
    { id: 'Batch 2022', name: 'Batch 2022' },
    { id: 'Batch 2023', name: 'Batch 2023' },
    { id: 'Batch 2024', name: 'Batch 2024' },
  ];

  const sections = Array.from({ length: 10 }, (_, i) => ({
    id: `Section ${String.fromCharCode(65 + i)}`,
    name: `Section ${String.fromCharCode(65 + i)}`,
  }));

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedBatch && selectedSection) {
        try {
          const batchRef = doc(db, 'batches', selectedBatch);
          const sectionRef = doc(batchRef, 'sections', selectedSection);
          const studentQuerySnapshot = await getDocs(collection(sectionRef, 'students'));
          const studentsData = [];
          studentQuerySnapshot.forEach((doc) => {
            studentsData.push({ id: doc.id, ...doc.data() });
          });
          setStudents(studentsData);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      } else {
        setStudents([]);
      }
    };
    fetchStudents();
  }, [selectedBatch, selectedSection]);

  const updateStudent = async (studentId, data) => {
    try {
      const studentRef = doc(
        db,
        `batches/${selectedBatch}/sections/${selectedSection}/students/${studentId}`
      );
      await updateDoc(studentRef, data);
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        const updatedStudent = { id: studentDoc.id, ...studentDoc.data() };
        const updatedStudents = students.map((student) =>
          student.id === studentId ? updatedStudent : student
        );
        setStudents(updatedStudents);
      }
    } catch (error) {
      console.error('Error updating student: ', error);
    }
  };

  const markPresent = async (studentId) => {
    try {
      await updateStudent(studentId, { status: 'present' });
      await updateStudentClasses(studentId, true);
    } catch (error) {
      console.error('Error marking present: ', error);
    }
  };

  const markAbsent = async (studentId, phoneNumber) => {
    try {
      await updateStudent(studentId, { status: 'absent' });
      await updateStudentClasses(studentId, false);
      // Make a POST request to the backend server for sending the SMS
      const response = await fetch('/absent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      if (response.ok) {
        // Display popup message if the SMS is sent successfully
        alert('SMS sent successfully');
      } else {
        throw new Error('Failed to send SMS');
      }
    } catch (error) {
      console.error('Error marking absent: ', error);
    }
  };
  
  
  const updateStudentClasses = async (studentId, isPresent) => {
    try {
      const studentRef = doc(
        db,
        `batches/${selectedBatch}/sections/${selectedSection}/students/${studentId}`
      );
      const studentDoc = await getDoc(studentRef);
      if (studentDoc.exists()) {
        const studentData = studentDoc.data();
        const totalClasses = studentData.totalClasses || 0;
        const classesAttended = studentData.classesAttended || 0;
        const updatedTotalClasses = totalClasses + 1;
        const updatedClassesAttended = isPresent ? classesAttended + 1 : classesAttended;
        await updateDoc(studentRef, {
          totalClasses: updatedTotalClasses,
          classesAttended: updatedClassesAttended,
        });
      }
    } catch (error) {
      console.error('Error updating student classes: ', error);
    }
  };

  return (
    <div>
      <h1>Faculty Management</h1>
      <div>
        <label>Select Batch:</label>
        <select onChange={(e) => setSelectedBatch(e.target.value)} value={selectedBatch}>
          <option value="">Select Batch</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Select Section:</label>
        <select onChange={(e) => setSelectedSection(e.target.value)} value={selectedSection}>
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Students</h2>
        {students.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Total Classes</th>
                <th>Classes Attended</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.roll}</td>
                  <td>{student.totalClasses || 0}</td>
                  <td>{student.classesAttended || 0}</td>
                  <td>{student.status}</td>
                  <td>
                    <button onClick={() => markPresent(student.id)}>Present</button>
                    <button onClick={() => markAbsent(student.id, student.phoneNo)}>Absent</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found.</p>
        )}
      </div>
    </div>
  );
};

export default Faculty;
