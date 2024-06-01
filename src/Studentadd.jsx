import React, { useState } from 'react';
import { db } from './firebase';

const Studentadd = () => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [roll, setRoll] = useState('');
  const [batch, setBatch] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [faculty, setFaculty] = useState('');
  const [attendedClasses, setAttendedClasses] = useState(0);

  const batches = ['Batch 2021', 'Batch 2022', 'Batch 2023', 'Batch 2024'];
  const sections = ['Section A', 'Section B', 'Section C', 'Section D', 'Section E', 'Section F', 'Section G', 'Section H', 'Section I', 'Section J', 'Section K'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const batchRef = db.collection('batches').doc(batch);
    let batchDoc = await batchRef.get();
    if (!batchDoc.exists) {
      // Create a new batch document
      await batchRef.set({
        name: batch,
        sections: {},
        date: new Date(),
      });
    }
    const sectionRef = batchRef.collection('sections').doc(section);
    let sectionDoc = await sectionRef.get();
    if (!sectionDoc.exists) {
      // Create a new section document
      await sectionRef.set({
        name: section,
        students: {},
        date: new Date(),
      });
    }
    const studentRef = sectionRef.collection('students').doc();
    await studentRef.set({
      name,
      phoneNo,
      roll,
      batch,
      section,
      subject,
      faculty,
      totalClasses: 50,
      attendedClasses: Number(attendedClasses), // Convert attendedClasses to a number
      date: new Date(),
    });
    // Reset form fields
    setName('');
    setPhoneNo('');
    setRoll('');
    setBatch('');
    setSection('');
    setSubject('');
    setFaculty('');
    setAttendedClasses(0);
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <select value={batch} onChange={(e) => setBatch(e.target.value)}>
          <option value="">Select Batch</option>
          {batches.map((batchOption) => (
            <option key={batchOption} value={batchOption}>
              {batchOption}
            </option>
          ))}
        </select>
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="">Select Section</option>
          {sections.map((sectionOption) => (
            <option key={sectionOption} value={sectionOption}>
              {sectionOption}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Faculty"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />
        <input
          type="number"
          placeholder="Attended Classes"
          value={attendedClasses}
          onChange={(e) => setAttendedClasses(e.target.value)}
        />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default Studentadd;
