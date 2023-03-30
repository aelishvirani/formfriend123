
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tracking = (props) => {
  const [dataGroup, setDataGroup] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const { id } = useParams();

  const getData = async () => {
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/EditForm/${id}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',
        },
      });
      const actualdata = await res.json();
      // console.log(actualdata.group);
      setDataGroup(actualdata.group);
    } catch (err) {
      console.log('err');
    }
  };
  
  
  const handleFilterData = async () => {
    const filtered = {};
    dataGroup.forEach(async (group, groupIndex) => {
      filtered[groupIndex] = [];
      group.participants.forEach((participant) => {
        if ((participant.seen === true && participant.filled === false) || (participant.seen === false && participant.filled === false)) {
          filtered[groupIndex].push(participant.email);
        }
      });
      
      const reminder={
        "GroupId":`${group.groupId}`,
        "Message":"Test",
        "Participants":filtered[groupIndex],
      }
      console.log(group.groupId);
      console.log(reminder);
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/AddReminder`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',
        },
        body: JSON.stringify(reminder),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    });
    setFilteredData(filtered);
    console.log(filtered);
    console.log(filteredData);
  
  };
  

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        Tracking {id}
      </div>
      <button className="btn btn-primary me-md-2" type="button">Add Group</button>
     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-primary me-md-2" type="button" onClick={handleFilterData}>Reminder</button>
      </div>
      {dataGroup.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <h1>
              {index + 1}. {value.groupName}
            </h1>
            <table className="table table-light table-hover" style={{ marginRight: '10px' }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Seen</th>
                  <th scope="col">Filled</th>
                </tr>
              </thead>
              <tbody>

                {value.participants.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{maxWidth:'125px',minWidth:'125px'}}>{data.email}</td>
                      <td>{data.seen ? 'Yes' : 'No'}</td>
                      <td>{data.filled ? 'Yes' : 'No'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Tracking;

// const [emails, setEmails] = useState({
  //   seenYesFilledNo: [],
  //   seenNoFilledNo: []
  // });
  // const handleReminder = () => {
  //   const seenYesFilledNo = [];
  //   const seenNoFilledNo = [];
  //   dataGroup.forEach(group => {
  //     group.participants.forEach(participant => {
  //       if (participant.seen && !participant.filled) {
  //         seenYesFilledNo.push(participant.email);
  //       } else if (!participant.seen && !participant.filled) {
  //         seenNoFilledNo.push(participant.email);
  //       }
  //     });
  //   });
  //   setEmails({ seenYesFilledNo, seenNoFilledNo });
  //   console.log(emails);
  //   addReminder();
  // };
  
  // const addReminder = async () => {
  //   try {
  //     const res = await fetch('http://formfriend.cleverapps.io/api//form/AddReminder', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ'
  //       },
  //       body: JSON.stringify({
  //         groupIds: [id],
  //         seenYesFilledNo: emails.seenYesFilledNo,
  //         seenNoFilledNo: emails.seenNoFilledNo
  //       })
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };



 // const handleFilterData = () => {
  //   const filtered = {};
  //   dataGroup.forEach((group, groupIndex) => {
  //     filtered[groupIndex] = [];
  //     group.participants.forEach((participant) => {
  //       if ((participant.seen === true && participant.filled === false) || (participant.seen === false && participant.filled === false)) {
  //         filtered[groupIndex].push(participant.email);
  //       }
  //     });
  //   });
  //   setFilteredData(filtered);
  //   console.log(filteredData);
  // };
  


// import React,{useEffect,useState} from 'react'
// import { useParams } from 'react-router-dom';
// const Tracking=(props)=> {
//     const[dataGroup,setDataGroup] = useState([]);
//     const[participants,setPartcipants]=useParams([]);
//     const {id} =useParams(); 

//     const getData = async () => {
//         try {
//             const res = await fetch(`http://formfriend.cleverapps.io/api/form/EditForm/${id}`,
//               {
//         mode: "cors",
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ"
//         },
//       }
//             );
//             const actualdata = await res.json();
            
//             console.log(actualdata.group);
//             setDataGroup(actualdata.group)
            
//         }
//         catch (err) {
//             console.log("err");
//         }
//     }

//     useEffect(() => {
//         getData();
//     },[])

//   return (
//     <>

//     <div>Tracking{id}</div>
//     {dataGroup.map((value,index)=>{
      
//         return(
//             <>
//                 <h1>{index} . {value.groupName}</h1>
//                 <table className="table table-light table-hover" style={{marginRight:"10px"}}>
//         <thead>
//     <tr>
//       <th scope="col">#</th>
//       <th scope="col">Email</th>
//       <th scope="col">Seen</th>
//       <th scope="col">Filled</th>
      
//     </tr>
//   </thead>
//   <tbody>
// {/* {participants.map((data,index)=>{
//     return(
//         <>
//         <th scope="row">{index+1}</th>
//         </>
//     )
// })} */}
//       <tr>
      
//       {/* <th scope="row">{value.participants}</th> */}
//       {/*<td>{group.groupName}</td>
//       <td>{total}</td> */}
 
//     </tr>
//   </tbody>
// </table>

//             </>
//         )
//     })}
    
//     </>
//   )
// }

// export default Tracking