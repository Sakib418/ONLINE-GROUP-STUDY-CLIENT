import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../hooks/useAuth";
const UpdateAssignment = () => {
  const navigate = useNavigate();
  const assignment = useLoaderData();
  console.log(assignment);
  const {user} = useAuth();
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
  
  const handleUpdateAssignment = (e) =>{
    e.preventDefault();
    const form = e.target;
    if(!user){
        Swal.fire('Please login first!!');
      navigate('/login');
      return;
    }
    if(user.email !== assignment.UserEmail){
        Swal.fire('You do not have the access to update this assignment!');
        return;
    }
    const Username = form.name.value;
    const imageURL = form.imageURL.value;
    const Assignmenttitle = form.Assignmenttitle.value;
    const DifficultyLevel = form.DifficultyLevel.value;
    const Description = form.Description.value;
    const AssignmentMarks = form.Marks.value;
    const AssignmentDate = startDate;
    const UserEmail = form.email.value;

    //console.log(name,imageURL,Campaigntitle,Campaigntype,Description,Donationamount,Deadline);
    
    const UpdatedAssignment = {
        
        Username,
        imageURL,
        Assignmenttitle,
        DifficultyLevel,
        Description,
        AssignmentMarks,
        AssignmentDate,
        UserEmail,
      } 
    console.log(UpdatedAssignment);

     
    fetch(`http://localhost:3000/UpdateAssignment/${_id}`,{
        method: 'PUT',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(UpdatedAssignment)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.acknowledged){
            Swal.fire({
                title: 'Success!',
                text: 'Assignment Updated Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              navigate('/assignments');
        }
    });
    

    
} 

  return (
    <div>
      <h1 className="mb-10 text-3xl font-bold">Update Assignment</h1>
      <form onSubmit={handleUpdateAssignment}>
        <div className="flex flex-col justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Assignment title"
            name="Assignmenttitle"
            className="input input-bordered w-full max-w-xs"
            defaultValue={Assignmenttitle}
          />

          <div>
            <textarea
              name="Description"
              class="textarea textarea-bordered w-80"
              placeholder="Description"
              defaultValue={Description}
            ></textarea>
          </div>

          <input
            type="number"
            placeholder="Marks"
            name="Marks"
            className="input input-bordered w-full max-w-xs"
            defaultValue={AssignmentMarks}
          />

          <input
            type="url"
            placeholder="image URL"
            name="imageURL"
            className="input input-bordered w-full max-w-xs"
            defaultValue={imageURL}
          />

          <select
            name="DifficultyLevel"
            className="select select-bordered w-full max-w-xs"
            defaultValue={DifficultyLevel}
          >
            <option disabled  value="Difficulty_Level">
              Difficulty Level
            </option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
            
          </select>

          <div className="flex items-center justify-center ">
            <DatePicker
               selected={startDate}
               onChange={(date) => setStartDate(date)}
              className="border  border-gray-300 rounded-lg px-16 py-2 text-gray-700 focus:ring focus:ring-blue-300 focus:outline-none"
              //defaultValue={AssignmentDate}
            />
          </div>

          

          <input
            disabled
            type="Email"
            placeholder="email"
            name="email"
            defaultValue={UserEmail}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="User name"
            name="name"
            disabled
            defaultValue={Username}
            className="input input-bordered w-full max-w-xs"
          />

          <div>
            <button className="btn btn-secondary btn-wide rounded-full">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateAssignment;
