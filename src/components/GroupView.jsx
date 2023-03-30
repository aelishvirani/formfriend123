import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router-dom';
const GroupView=() =>{
    const { propValue } = useParams();
    const[group,setGroup] = useState([])
    const [participants,setParticipants] = useState([]);
    const getData = async () => {
        try {
            const res = await fetch(`http://formfriend.cleverapps.io/api/group/GetGroup/${propValue}`,
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
            console.log(actualdata.groupParticipant);
            console.log(actualdata);
            setGroup(actualdata)
            setParticipants(actualdata.groupParticipant);
        }
        catch (err) {
            console.log("err");
        }
    }

    useEffect(() => {
        getData();
    },[])

  return (
   <> <div>GroupView {propValue}</div>
   <h1>
    {group.groupName}
   </h1>
   <h3>{group.date}</h3>
   <p>{group.description}</p>
    <table className="table table-light table-hover" style={{marginRight:"10px"}}>
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">email</th>
    </tr>
  </thead>
  <tbody>
  {participants.map((memb,index)=>{
          
    return(
      <>
      
      <tr>
      <th scope="row">{index+1}</th>
      <td>{memb}</td>
    </tr></>)

  })}
  </tbody>
</table>
   </>
  )
}

export default GroupView;