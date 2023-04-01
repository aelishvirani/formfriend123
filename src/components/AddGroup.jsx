import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function AddGroup() {
  // const navigate = useNavigate();
  var navigate = useNavigate();
  const token = Cookies.get("token");
  
  const check = () =>{
    if(token==undefined)
    {
      window.location.href = "/";
      navigate("/");
    }
    }
    useEffect(()=>{
      check()
    },[])
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
        Authorization: "Bearer " + token },
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