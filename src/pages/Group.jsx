import React,{useEffect,useState} from 'react'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AddGroup from '../components/AddGroup'
function Group() {


  const [dataGroup,setGroupData] = useState([]);
  const [total,setTotal] = useState(0);
  const getData = async () => {
      try {
          const res = await fetch('http://formfriend.cleverapps.io/api/group/GetGroups',
            {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ"
      },
    }
          );
          const actualdata = await res.json();
          
          console.log(actualdata);
          console.log(actualdata.groupName);
          setGroupData(actualdata);

      }
      catch (err) {
          console.log("err");
      }
  }

  useEffect(() => {
      getData();
  },[])






  return (
    <>
    <div><Link to='/group/addGroup'><Button style={{marginBottom:'10px'}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg> Add new Group</Button></Link></div>
        <table className="table table-light table-hover" style={{marginRight:"10px"}}>
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Group Name</th>
      <th scope="col">No. of member</th>
      <th scope="col">Group Link</th>
      <th scope="col">Date</th>
      <th scope="col">view</th>
    </tr>
  </thead>
  <tbody>
  {dataGroup.map((group,index)=>{
    console.log(group.groupParticipant);
    const mem = group.groupParticipant;
    const total=mem.length;
    const propValue =group.groupId
          
    return(
      <>
      
      <tr>
      <th scope="row">{index+1}</th>
      <td>{group.groupName}</td>
      <td>{total}</td>
      <td>{group.groupLink}</td>
      <td>{group.date}</td>
     <Link to={`/${propValue}/GroupView`}>
      {/* <td>{group.groupId}</td> */}
       <td style={{color:"blue"}}>View</td> 
      </Link>
      {/* <Link><td>view</td></Link> */}
    </tr></>)

  })}
    
    
  </tbody>
</table>
    </>
  )
}

export default Group