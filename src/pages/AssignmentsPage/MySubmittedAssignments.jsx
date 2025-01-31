import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaFileAlt, FaRegClock, FaComments, FaCheckCircle } from 'react-icons/fa'; // Import icons
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const MySubmittedAssignments = () => {
    const [assignments,setassignments] = useState([]);
    //const assignments = useLoaderData();
    const {user} = useAuth();
    useEffect(() => {
        axios.get(`https://online-group-study-server-pi-lyart.vercel.app/GetAssignmentDataByEmail/${user.email}`,{withCredentials: true})
        .then(res=> setassignments(res.data))
      },[user.email]);


    return (
        <div className="container mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
  <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
    Submitted Assignments
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {assignments.map((assignment, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg p-6 flex flex-col dark:bg-gray-800 dark:text-gray-300"
      >
        {/* Title */}
        <div className="flex items-center mb-4">
          <FaFileAlt className="text-gray-600 dark:text-gray-400 mr-2" />
          <h2 className="text-xl font-medium text-gray-800 dark:text-white">
            {assignment.AssignmentTitle}
          </h2>
        </div>

        {/* Status */}
        <div className="flex items-center mb-2">
          <FaRegClock className="text-gray-500 dark:text-gray-400 mr-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Status:</strong> {assignment.Status || "Not Submitted"}
          </p>
        </div>

        {/* Obtained Marks */}
        <div className="flex items-center mb-2">
          <FaCheckCircle className="text-green-500 mr-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Obtained Marks:</strong> {assignment.ObtainedMarks || "N/A"}
          </p>
        </div>

        {/* Assignment Marks */}
        <div className="flex items-center mb-2">
          <FaRegClock className="text-gray-500 dark:text-gray-400 mr-2" />
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Assignment Marks:</strong> {assignment.AssignmentMarks || "Pending"}
          </p>
        </div>

        {/* Feedback */}
        {assignment.Feedback && (
          <div className="flex items-center mb-4">
            <FaComments className="text-blue-500 dark:text-blue-400 mr-2" />
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Feedback:</strong> {assignment.Feedback}
            </p>
          </div>
        )}

        {/* View Document (Uncomment if needed) */}
        {/* <div className="mt-2">
          <a
            href={assignment.GoogleDocsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:underline"
          >
            View Assignment Document
          </a>
        </div> */}
      </div>
    ))}
  </div>
</div>

    );
};

export default MySubmittedAssignments;
