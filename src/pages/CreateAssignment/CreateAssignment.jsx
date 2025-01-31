import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';

const CreateAssignment = () => {
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date());

  const handleAddAssignment = (e) => {
    e.preventDefault();
    const form = e.target;

    const Username = form.name.value;
    const imageURL = form.imageURL.value;
    const Assignmenttitle = form.Assignmenttitle.value;
    const DifficultyLevel = form.DifficultyLevel.value;
    const Description = form.Description.value;
    const AssignmentMarks = form.Marks.value;
    const AssignmentDate = startDate.toISOString();
    const UserEmail = form.email.value;

    if (!Assignmenttitle || !Description || !AssignmentMarks || !imageURL || !DifficultyLevel) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all the required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const newAssignment = {
      Username,
      imageURL,
      Assignmenttitle,
      DifficultyLevel,
      Description,
      AssignmentMarks,
      AssignmentDate,
      UserEmail,
    };

    fetch('https://online-group-study-server-pi-lyart.vercel.app/CreateAssignment', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Assignment Added Successfully',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          e.target.reset();
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-900 dark:text-white">
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
    Create Assignment
  </h1>

  <form onSubmit={handleAddAssignment} className="space-y-6">
    {/* Grid Inputs */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <input
        type="text"
        name="Assignmenttitle"
        placeholder="Assignment Title"
        className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />

      <input
        type="number"
        name="Marks"
        placeholder="Marks"
        className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />

      <input
        type="url"
        name="imageURL"
        placeholder="Image URL"
        className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />

      <select
        name="DifficultyLevel"
        className="select select-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        defaultValue="Difficulty_Level"
      >
        <option disabled value="Difficulty_Level" className="dark:text-gray-400">
          Difficulty Level
        </option>
        <option value="Easy" className="dark:bg-gray-800 dark:text-white">Easy</option>
        <option value="Medium" className="dark:bg-gray-800 dark:text-white">Medium</option>
        <option value="Hard" className="dark:bg-gray-800 dark:text-white">Hard</option>
      </select>
    </div>

    {/* Description */}
    <textarea
      name="Description"
      className="textarea textarea-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      placeholder="Description"
      rows="4"
    ></textarea>

    {/* Date, Email, and Name */}
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        className="input input-bordered w-full sm:w-auto bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        disabled
        defaultValue={user?.email}
        className="input input-bordered w-full sm:w-auto bg-gray-100 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />

      <input
        type="text"
        name="name"
        placeholder="User Name"
        disabled
        defaultValue={user?.displayName}
        className="input input-bordered w-full sm:w-auto bg-gray-100 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>

    {/* Submit Button */}
    <div className="text-center">
      <button type="submit" className="btn btn-primary btn-wide rounded-full">
        Add Assignment
      </button>
    </div>
  </form>
</div>

  );
};

export default CreateAssignment;
