
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaBook, FaUserAlt, FaTrophy, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const PendingAssignments = () => {
    //const pendingAssignment = useLoaderData();
    const [pendingAssignment,setpendingAssignment] = useState([]);
    const {user} = useAuth();
    
    useEffect(() => {
      axios.get(`http://localhost:3000/GetPendingAssignment`,{withCredentials: true})
      .then(res=> setpendingAssignment(res.data))
    },[user.email]);


    

    const handleAssignmentMark = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Submitted Data:', data);
        
        if (user.email === data.email) {
            const modal = document.getElementById('my_modal_5');  // Ensure modal is defined
            if (modal) {
                modal.close();  // Close modal if open
            }
            Swal.fire('Submitter cannot review their own assignment!');
            return;
        }
        fetch(`http://localhost:3000/MarkedAssignment/${data.id}`,{
                        method: 'PATCH',
                        headers:{
                            'content-type':'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        const modal = document.getElementById('my_modal_5');
                        const form = e.target;
                        if(data.acknowledged){ 
                            if (modal) modal.close();
                            form.reset();
                            Swal.fire({
                                title: 'Success!',
                                text: 'Assignment submitted Successfully',
                                icon: 'success',
                                confirmButtonText: 'Cool'
                              })
                        }
                        else{
                            if (modal) modal.close();
                            Swal.fire('Submition failed!');
                        }
                    });
        // Close modal after submission
        // const modal = document.getElementById("my_modal_5");
        // if (modal) modal.close();
    };

    const handleOpenModal = (assignment) => {
        const modal = document.getElementById("my_modal_5");
        if (modal) {
            modal.showModal();
            document.getElementById("googleDocsLink").href = assignment.GoogleDocsLink; // Set Google Docs link
            document.getElementById("notes").value = assignment.Notes; // Set Google Docs link
            document.getElementById("id").value = assignment._id; 
            document.getElementById("email").value = assignment.SubmiterEmail; 
            console.log(assignment.SubmiterEmail);
        }  
    };

    const handleCloseModal = () => {
        const modal = document.getElementById("my_modal_5");
        if (modal) modal.close();
    };

    return (
        <div className='bg-white dark:bg-gray-900 text-black dark:text-white'>
            <div className="container mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center dark:text-white">Pending Assignments</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingAssignment.map((assignment) => (
                        // <div
                        //     key={assignment._id}
                        //     className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300  dark:bg-gray-900 text-black dark:text-white"
                        // >
                        //     {/* Assignment Title with Icon */}
                        //     <div className="flex items-center mb-4">
                        //         <FaBook className="text-blue-500 text-xl mr-3" />
                        //         <h2 className="text-lg font-semibold text-gray-800">
                        //             {assignment.AssignmentTitle}
                        //         </h2>
                        //     </div>

                        //     {/* Divider */}
                        //     <div className="h-0.5 bg-gray-200 my-3"></div>

                        //     {/* Assignment Details */}
                        //     <div className="flex items-center mb-2">
                        //         <FaTrophy className="text-yellow-500 text-lg mr-3" />
                        //         <p className="text-sm text-gray-600">
                        //             <span className="font-medium">Assignment Marks:</span> {assignment.AssignmentMarks}
                        //         </p>
                        //     </div>
                        //     <div className="flex items-center mb-4">
                        //         <FaUserAlt className="text-green-500 text-lg mr-3" />
                        //         <p className="text-sm text-gray-600">
                        //             <span className="font-medium">Submitted By:</span> {assignment.SubmitedBy || 'N/A'}
                        //         </p>
                        //     </div>

                        //     {/* Give Mark Button */}
                        //     <button
                        //         className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                        //         onClick={() => handleOpenModal(assignment)}
                        //     >
                        //         <FaEdit className="text-white mr-2" />
                        //         Give Mark
                        //     </button>
                        // </div>
                        <div
    key={assignment._id}
    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-gray-800 dark:text-gray-200"
>
    {/* Assignment Title with Icon */}
    <div className="flex items-center mb-4">
        <FaBook className="text-blue-500 dark:text-blue-400 text-xl mr-3" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {assignment.AssignmentTitle}
        </h2>
    </div>

    {/* Divider */}
    <div className="h-0.5 bg-gray-200 dark:bg-gray-600 my-3"></div>

    {/* Assignment Details */}
    <div className="flex items-center mb-2">
        <FaTrophy className="text-yellow-500 dark:text-yellow-400 text-lg mr-3" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Assignment Marks:</span> {assignment.AssignmentMarks}
        </p>
    </div>
    <div className="flex items-center mb-4">
        <FaUserAlt className="text-green-500 dark:text-green-400 text-lg mr-3" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Submitted By:</span> {assignment.SubmitedBy || 'N/A'}
        </p>
    </div>

    {/* Give Mark Button */}
    <button
        className="w-full flex items-center justify-center bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
        onClick={() => handleOpenModal(assignment)}
    >
        <FaEdit className="text-white mr-2" />
        Give Mark
    </button>
</div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
    <div className="modal-box bg-white dark:bg-gray-900 text-black dark:text-white">
        <h3 className="text-lg font-bold mb-4 text-center">Assignment Review</h3>
        <form onSubmit={handleAssignmentMark}>
            <div className="flex flex-col gap-4">
                {/* Google Docs Link */}
                <a
                    id="googleDocsLink"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary w-full text-center dark:border-gray-500 dark:text-white"
                >
                    Open Docs
                </a>

                {/* Notes Field */}
                <textarea
                    name="notes"
                    id="notes"
                    className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    placeholder="Notes"
                    disabled
                ></textarea>

                {/* Feedback Field */}
                <textarea
                    name="feedback"
                    className="textarea textarea-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    placeholder="Feedback"
                    required
                ></textarea>

                {/* Marks Field */}
                <input
                    type="number"
                    name="marks"
                    className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    placeholder="Marks"
                    min="0"
                    required
                />
                
                <input id="id" type="text" name="id" hidden />
                <input id="email" type="text" name="email" hidden />
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
                <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn btn-error btn-sm dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
                >
                    Close
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</dialog>

        </div>
    );
};

export default PendingAssignments;

