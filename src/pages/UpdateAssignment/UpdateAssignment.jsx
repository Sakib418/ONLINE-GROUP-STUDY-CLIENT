import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";

const UpdateAssignment = () => {
  const navigate = useNavigate();
  const assignment = useLoaderData();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(new Date(assignment.AssignmentDate));

  const {
    _id,
    Username,
    imageURL,
    Assignmenttitle,
    DifficultyLevel,
    Description,
    AssignmentMarks,
    UserEmail,
  } = assignment;

  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;

    if (!user) {
      Swal.fire("Please login first!");
      navigate("/login");
      return;
    }

    if (user.email !== assignment.UserEmail) {
      Swal.fire("You do not have the access to update this assignment!");
      return;
    }

    const updatedAssignment = {
      Username: form.name.value,
      imageURL: form.imageURL.value,
      Assignmenttitle: form.Assignmenttitle.value,
      DifficultyLevel: form.DifficultyLevel.value,
      Description: form.Description.value,
      AssignmentMarks: form.Marks.value,
      AssignmentDate: startDate,
      UserEmail: form.email.value,
    };

    // Validation checks
    if (
      !updatedAssignment.Assignmenttitle ||
      !updatedAssignment.Description ||
      !updatedAssignment.AssignmentMarks ||
      !updatedAssignment.imageURL ||
      !updatedAssignment.DifficultyLevel
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all the required fields.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Update assignment request
    fetch(`https://online-group-study-server-pi-lyart.vercel.app/UpdateAssignment/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedAssignment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Assignment Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate("/assignments");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-900 dark:text-white">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
      Update Assignment
    </h1>
  
    <form onSubmit={handleUpdateAssignment} className="space-y-6">
      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <input
          type="text"
          name="Assignmenttitle"
          placeholder="Assignment Title"
          defaultValue={Assignmenttitle}
          className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
  
        <input
          type="number"
          name="Marks"
          placeholder="Marks"
          defaultValue={AssignmentMarks}
          className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
  
        <input
          type="url"
          name="imageURL"
          placeholder="Image URL"
          defaultValue={imageURL}
          className="input input-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        />
  
        <select
          name="DifficultyLevel"
          className="select select-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          defaultValue={DifficultyLevel}
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
        placeholder="Description"
        defaultValue={Description}
        className="textarea textarea-bordered w-full bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
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
          defaultValue={UserEmail}
          className="input input-bordered w-full sm:w-auto bg-gray-100 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
  
        <input
          type="text"
          name="name"
          placeholder="User Name"
          disabled
          defaultValue={Username}
          className="input input-bordered w-full sm:w-auto bg-gray-100 text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
  
      {/* Submit Button */}
      <div className="text-center">
        <button type="submit" className="btn btn-primary btn-wide rounded-full">
          Update Assignment
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default UpdateAssignment;
