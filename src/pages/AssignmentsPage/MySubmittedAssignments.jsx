import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaFileAlt, FaRegClock, FaComments, FaCheckCircle } from 'react-icons/fa'; // Import icons

const MySubmittedAssignments = () => {
    // Load the assignment data
    const assignments = useLoaderData();

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-6">Submitted Assignments</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map((assignment, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 flex flex-col"
                    >
                        {/* Assignment Title with icon */}
                        <div className="flex items-center mb-4">
                            <FaFileAlt className="text-gray-600 mr-2" />
                            <h2 className="text-xl font-medium text-gray-800">{assignment.AssignmentTitle}</h2>
                        </div>
                        
                        {/* Status with icon */}
                        <div className="flex items-center mb-2">
                            <FaRegClock className="text-gray-500 mr-2" />
                            <p className="text-sm text-gray-600"><strong>Status:</strong> {assignment.Status || 'Not Submitted'}</p>
                        </div>

                        {/* Obtained Marks with icon */}
                        <div className="flex items-center mb-2">
                            <FaCheckCircle className="text-green-500 mr-2" />
                            <p className="text-sm text-gray-600"><strong>Obtained Marks:</strong> {assignment.ObtainedMarks || 'N/A'}</p>
                        </div>

                        {/* Assignment Marks */}
                        <div className="flex items-center mb-2">
                            <FaRegClock className="text-gray-500 mr-2" />
                            <p className="text-sm text-gray-600"><strong>Assignment Marks:</strong> {assignment.AssignmentMarks || 'Pending'}</p>
                        </div>

                        {/* Feedback with icon (if exists) */}
                        {assignment.Feedback && (
                            <div className="flex items-center mb-4">
                                <FaComments className="text-blue-500 mr-2" />
                                <p className="text-sm text-gray-600"><strong>Feedback:</strong> {assignment.Feedback}</p>
                            </div>
                        )}

                        {/* Google Docs Link */}
                        {/* <div className="mt-2">
                            <a href={assignment.GoogleDocsLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
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
