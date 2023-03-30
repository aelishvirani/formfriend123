import React from 'react'
import { useNavigate } from "react-router-dom";

function AddGroup() {
  const navigate = useNavigate();
 const createGroup = async () => {
  console.log("sdfk");
    const groupName = document.getElementById('inputGroupname').value;
    const groupDescription = document.getElementById('inputDescription').value;
    var groupParticipants = document.getElementById('inputParticipants').value;
    groupParticipants = groupParticipants.split(' ');
    const group = {
      GroupName: groupName,
      Description: groupDescription,
      GroupParticipant: groupParticipants,
    };
    console.log(group);
    try {
      const response = await fetch('http://formfriend.cleverapps.io/api/group/AddGroup', {
        method: 'POST',
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ"
        },
        body: JSON.stringify(group),
      });
      const data = response.status;
      if(data==200)
      {
        //redirect to group page
        navigate("/group");
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <form>
    <div className="row mb-3">
    <label for="inputGroupname" className="col-sm-2 col-form-label">Group Name : </label>
    <div className="col-sm-5">
      <input type="text" className="form-control" id="inputGroupname"/> 
    </div>
  </div>
    
    <div className="row mb-3">
    <label for="inputDescription" className="col-sm-2 col-form-label">Group Description :</label>
    <div className="col-sm-5">
      <textarea type="textarea" className="form-control" id="inputDescription"></textarea>
    </div>
  </div>

  <div className="row mb-3">
    <label for="inputDescription" className="col-sm-2 col-form-label">Group Participants :</label>
    <div className="col-sm-5">
      <textarea type="textarea" className="form-control" id="inputParticipants"></textarea>
    </div>
  </div>

  <br/>
    <br/>
    <div className='row'>
      
    <button className='btn btn-primary col-1' type="button" onClick={createGroup}>Create</button>
    <div style={{width:'10px'}}></div>
    <button className='btn btn-primary col-1'type='reset' >Reset</button>
    </div>
    </form>
  )
}

export default AddGroup