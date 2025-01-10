import React, {  useState } from 'react';

import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../hooks/useAuth';
const CreateAssignment = () => {


    const {user} = useAuth();
    const [startDate, setStartDate] = useState(new Date());
    
    
    const handleAddAssignment = (e) =>{
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
        

        
        //console.log(name,imageURL,Campaigntitle,Campaigntype,Description,Donationamount,Deadline);
        
        const newAssignment = {
            Username,imageURL,Assignmenttitle,DifficultyLevel,Description,AssignmentMarks,AssignmentDate,UserEmail

        }
        console.log(newAssignment);

         
        fetch('http://localhost:3000/CreateAssignment',{
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(newAssignment)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'User Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        });
        

        
    } 
    return (
        <div>
      <h1 className="mb-10 text-3xl font-bold">Add Assignment</h1>
      <form onSubmit={handleAddAssignment}>
        {/* <div>

        </div> */}
        <div className="flex flex-col justify-center items-center gap-2">
        <input
            type="text"
            placeholder="Assignment title"
            name="Assignmenttitle"
            className="input input-bordered w-full max-w-xs"
          />

          <div>
          <textarea name="Description" class="textarea textarea-bordered w-80" placeholder="Description"></textarea>
          </div>
        
          <input
            type="number"
            placeholder="Marks"
            name="Marks"
            className="input input-bordered w-full max-w-xs"
          />
           
          <input
            type="url"
            placeholder="image URL"
            name="imageURL"
            className="input input-bordered w-full max-w-xs"
          />
          
          <select name= "DifficultyLevel" className="select select-bordered w-full max-w-xs">
            <option disabled selected value="Difficulty_Level">
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
      />
    </div>
          
          {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            <input
            type="date"
            placeholder="Donation amount"
            name="Deadline"
            className="input input-bordered w-full max-w-xs"
          /> */}
          
          <input
            disabled
            type="Email"
            placeholder="email"
            name="email"
            defaultValue={user && user?.email}
            className="input input-bordered w-full max-w-xs"
          />
<input
            type="text"
            placeholder="User name"
            name="name"
            disabled
            defaultValue={user && user?.displayName}
            className="input input-bordered w-full max-w-xs"
          />

<div>
            <button className="btn btn-secondary btn-wide rounded-full">
                Add
            </button>
        </div>
        </div>
        
      </form>
    </div>
    );
};

export default CreateAssignment;