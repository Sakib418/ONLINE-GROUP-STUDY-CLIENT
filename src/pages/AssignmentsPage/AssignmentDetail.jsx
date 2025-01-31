
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const AssignmentDetail = () => {
  const assignment = useLoaderData();
  const {user} = useAuth();
  const {
    _id,
    Username,
    imageURL,
    Assignmenttitle,
    DifficultyLevel,
    Description,
    AssignmentMarks,
    UserEmail,
    AssignmentDate,
  } = assignment;

  const handleOpenModal = (e) => {
    e.preventDefault();
    const modal = document.getElementById("my_modal_5");
    if (modal) modal.showModal();
  };
  
  const handleAssignmentSubmission = (e) => {
    e.preventDefault();
    const form = e.target;
    const GooleDocsLink = form.googleDocsLink.value;
    const Notes = form.notes.value;
    const AssignmentID = _id;
    const SubmiterEmail = user.email;
    const Status = 'Pending';
    const SubmitedBy = user.displayName;
    const Feedback = '';
    const ObtainedMarks = '';
   
    const submitionData = {
        GooleDocsLink,
        Notes,
        AssignmentID,
        SubmiterEmail,
        Status,
        SubmitedBy,
        Feedback,
        ObtainedMarks
    } 
    
    fetch('http://localhost:3000/AssignmentSubmition',{
                method: 'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify(submitionData)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    const modal = document.getElementById('my_modal_5');
                    if (modal) modal.close();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment submitted Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
                else{
                    Swal.fire('Submition failed!');
                }
            });
  }

  const handleCloseModal = (e) => {
    e.preventDefault();
    const modal = document.getElementById("my_modal_5");
    if (modal) modal.close();
  };

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{Assignmenttitle}</h1>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        <div className="flex justify-center">
          <img
            src={imageURL || "https://via.placeholder.com/500"}
            alt={Assignmenttitle}
            className="rounded-lg shadow-md object-cover w-full h-72"
          />
        </div>

        
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 mb-6">{Description}</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 w-32">Difficulty:</span>
                <span className="capitalize text-gray-800">{DifficultyLevel}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 w-32">Marks:</span>
                <span>{AssignmentMarks}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-600 w-32">Date:</span>
                <span>{new Date(AssignmentDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-10">
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Created By</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {Username}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {UserEmail}
          </p>
        </div>
      </div>

      
      <div className="flex justify-end mt-8">
        <button onClick={handleOpenModal} className="btn btn-primary mr-4">
          Take Assignment
        </button>
      </div>

      
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold mb-4 text-center">Assignment Submission</h3>
          <form onSubmit={handleAssignmentSubmission}>
          <div className="flex flex-col justify-center items-center gap-2">
          <input
            type="url"
            placeholder="Google docs link"
            name="googleDocsLink"
            className="input  input-bordered w-full max-w-xs" required
          />
          <div>
          <textarea name="notes" class="textarea textarea-bordered w-80" placeholder="Notes" required></textarea>
          </div>
            </div>
          <div className="modal-action">
            <button onClick={handleCloseModal} className="btn btn-error btn-sm">
              Close
            </button>
            <button className="btn btn-sm btn-primary">
              Submit
            </button>
          </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AssignmentDetail;

