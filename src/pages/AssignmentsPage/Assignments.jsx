

// export default Assignments;

import React from 'react';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const Assignments = () => {
  const assignments = useLoaderData();
  const navigate = useNavigate();
  const {user} = useAuth();
   

  const handleDelete = (_id,CurrentUser) => {

    if(user){
    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
             if(user.UserEmail === CurrentUser){
              fetch(`http://localhost:3000/DeleteAssignments/${_id}`, {
                  method: "DELETE",
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your Campaign has been deleted.",
                        icon: "success",
                      });
                    }
                  });
             }else{
              Swal.fire("You are not the creator of this assignment. So, You can't delete it!");
             }
            }
          });
    }else{
      Swal.fire({
          title: "Login first!!",
          text: "Please login using a user ID",
          icon: "question"
        });
        navigate('/login');
    }


  };
  
  const updateAssignment = (_id) => {
    navigate(`/updateAssignment/${_id}`)
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-10">
      {
        assignments.map((assignment) => (
          <div 
            key={assignment._id} 
            className="card card-compact bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={assignment.imageURL}
                alt={assignment.Assignmenttitle || "Assignment"}
                className="w-full h-52 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">
                {assignment.Assignmenttitle}
              </h2>
              <p className="text-gray-600">
                {assignment.Description}
              </p>
              <p className="text-sm text-gray-500">
                Difficulty: <span className="capitalize">{assignment.DifficultyLevel}</span>
              </p>
              <p className="text-sm text-gray-500">
                Marks: {assignment.AssignmentMarks}
              </p>
              <p className="text-sm text-gray-500">
                Date: {new Date(assignment.AssignmentDate).toLocaleDateString()}
              </p>
              
              <div className="card-actions flex flex-row gap-2 justify-center items-center">
                <button onClick={() => handleDelete (assignment._id,assignment.
UserEmail) } className="btn btn-sm btn-primary">Delete</button>
                <button className="btn btn-sm btn-primary" onClick={() => updateAssignment(assignment._id)}>Update</button>
                <button className="btn btn-sm btn-primary">View</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Assignments;