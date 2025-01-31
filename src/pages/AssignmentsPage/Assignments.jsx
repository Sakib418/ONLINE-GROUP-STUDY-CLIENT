

// // export default Assignments;

// import React, { useState } from 'react';
// import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import useAuth from '../../hooks/useAuth';

// const Assignments = () => {
//   const assignment = useLoaderData();
//   const {assignments,setAssignment} = useState(assignment);
//   const navigate = useNavigate();
//   const {user} = useAuth();
   

//   const handleDelete = (_id,CurrentUser) => {
//     if(user){
//         Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//           }).then((result) => {
//             if (result.isConfirmed) {
//              if(user.UserEmail === CurrentUser){
//               fetch(`https://online-group-study-server-pi-lyart.vercel.app/DeleteAssignments/${_id}`, {
//                   method: "DELETE",
//                 })
//                   .then((res) => res.json())
//                   .then((data) => {
//                     console.log(data);
//                     if (data.deletedCount > 0) {
//                       Swal.fire({
//                         title: "Deleted!",
//                         text: "Your Campaign has been deleted.",
//                         icon: "success",
//                       });
//                     }
//                   });
//              }else{
//               Swal.fire("You are not the creator of this assignment. So, You can't delete it!");
//              }
//             }
//           });
//     }else{
//       Swal.fire({
//           title: "Login first!!",
//           text: "Please login using a user ID",
//           icon: "question"
//         });
//         navigate('/login');
//     }


//   };
  
//   const updateAssignment = (_id) => {
//     navigate(`/updateAssignment/${_id}`)
//   }
//   const assignmentDetail = (_id) => {
//     navigate(`/assignmentDetail/${_id}`)
//   }
//   const handleDifficultyChange = async (e) => {
//     const difficulty = e.target.value;
//     if (difficulty === "Difficulty_Level") return;

//     try {
//       //setLoading(true);
//       const response = await axios.get(`https://online-group-study-server-pi-lyart.vercel.app/AllAssignments?difficulty=${difficulty}`);
//       setAssignments(response.data);
//       //setLoading(false);
//     } catch (error) {
//       console.error("Error fetching assignments:", error);
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <div className='text-right'>
//       <select
//             name="DifficultyLevel"
//             className="select select-bordered "
//             defaultValue="Difficulty_Level"
//             onChange={handleDifficultyChange}
//           >
//             <option disabled value="Difficulty_Level">
//               Difficulty Level
//             </option>
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>
//           </div>
//  <div className="grid lg:grid-cols-3 gap-6 mt-10">
//       {
//         assignments.map((assignment) => (
//           <div 
//             key={assignment._id} 
//             className="card card-compact bg-base-100 shadow-xl"
//           >
//             <figure>
//               <img
//                 src={assignment.imageURL}
//                 alt={assignment.Assignmenttitle || "Assignment"}
//                 className="w-full h-52 object-cover"
//               />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title text-lg font-bold">
//                 {assignment.Assignmenttitle}
//               </h2>
//               <p className="text-gray-600">
//                 {assignment.Description}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Difficulty: <span className="capitalize">{assignment.DifficultyLevel}</span>
//               </p>
//               <p className="text-sm text-gray-500">
//                 Marks: {assignment.AssignmentMarks}
//               </p>
//               <p className="text-sm text-gray-500">
//                 Date: {new Date(assignment.AssignmentDate).toLocaleDateString()}
//               </p>
              
//               <div className="card-actions flex flex-row gap-2 justify-center items-center">
//                 <button onClick={() => handleDelete (assignment._id,assignment.
// UserEmail) } className="btn btn-sm btn-primary">Delete</button>
//                 <button className="btn btn-sm btn-primary" onClick={() => updateAssignment(assignment._id)}>Update</button>
//                 <button className="btn btn-sm btn-primary" onClick={() => assignmentDetail(assignment._id)}>View</button>
//               </div>
//             </div>
//           </div>
//         ))
//       }
//     </div>
//     </div>
   
//   );
// };

// export default Assignments;



import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Assignments = () => {
  const initialAssignments = useLoaderData();
  const [assignments, setAssignments] = useState(initialAssignments || []);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDelete = (_id, currentUser) => {
    if (user) {
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
          if (user.email === currentUser) {
            fetch(`https://online-group-study-server-pi-lyart.vercel.app/DeleteAssignments/${_id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.deletedCount > 0) {
                  Swal.fire("Deleted!", "Your assignment has been deleted.", "success");
                  setAssignments(assignments.filter((assignment) => assignment._id !== _id));
                }
              })
              .catch((err) => {
                console.error("Error deleting assignment:", err);
                Swal.fire("Error", "Something went wrong while deleting.", "error");
              });
          } else {
            Swal.fire("Permission Denied", "You can't delete this assignment!", "error");
          }
        }
      });
    } else {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to delete assignments.",
        icon: "info",
      });
      navigate('/login');
    }
  };

  const handleDifficultyChange = async (e) => {
    const difficulty = e.target.value;
    if (difficulty === "Difficulty_Level") return;

    try {
      setLoading(true);
      const response = await axios.get(`https://online-group-study-server-pi-lyart.vercel.app/AllAssignments?difficulty=${difficulty}`);
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      Swal.fire("Error", "Unable to fetch assignments.", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateAssignment = (_id) => {
    navigate(`/updateAssignment/${_id}`);
  };

  const assignmentDetail = (_id) => {
    navigate(`/assignmentDetail/${_id}`);
  };

  return (
    <div className='bg-white dark:bg-gray-900 text-black dark:text-white'>
      <div className="text-right ">
      <select
  name="DifficultyLevel"
  className="select select-bordered select-sm bg-white dark:bg-gray-900 text-black dark:text-white border-gray-300 dark:border-gray-600"
  defaultValue="Difficulty_Level"
  onChange={handleDifficultyChange}
>
  <option disabled value="Difficulty_Level" className="dark:text-gray-400">
    Difficulty Level
  </option>
  <option value="Easy" className="dark:text-white dark:bg-gray-800">Easy</option>
  <option value="Medium" className="dark:text-white dark:bg-gray-800">Medium</option>
  <option value="Hard" className="dark:text-white dark:bg-gray-800">Hard</option>
</select>

      </div>

      {loading ? (
        <p className="text-center text-lg font-semibold">Loading assignments...</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 mt-10">
  {assignments.length > 0 ? (
    assignments.map((assignment) => (
      <div 
        key={assignment._id} 
        className="card card-compact bg-white dark:bg-gray-900 shadow-xl text-black dark:text-white"
      >
        <figure>
          <img
            src={assignment.imageURL}
            alt={assignment.Assignmenttitle || "Assignment"}
            className="w-full h-52 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-lg font-bold">{assignment.Assignmenttitle}</h2>
          <p className="text-gray-600 dark:text-gray-300">{assignment.Description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Difficulty: <span className="capitalize">{assignment.DifficultyLevel}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Marks: {assignment.AssignmentMarks}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Date: {new Date(assignment.AssignmentDate).toLocaleDateString()}
          </p>

          <div className="card-actions flex flex-row gap-2 justify-center items-center">
            <button
              onClick={() => handleDelete(assignment._id, assignment.UserEmail)}
              className="btn btn-sm btn-primary dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            >
              Delete
            </button>
            <button
              className="btn btn-sm btn-primary dark:bg-green-600 dark:hover:bg-green-700 dark:text-white"
              onClick={() => updateAssignment(assignment._id)}
            >
              Update
            </button>
            <button
              className="btn btn-sm btn-primary dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
              onClick={() => assignmentDetail(assignment._id)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-center text-lg font-semibold dark:text-white">No assignments found.</p>
  )}
</div>

      )}
    </div>
  );
};

export default Assignments;
