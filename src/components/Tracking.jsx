import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Tracking = (props) => {
  const [dataGroup, setDataGroup] = useState([]);
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
      console.log(actualdata.group);
      setDataGroup(actualdata.group);
    } catch (err) {
      console.log('err');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>Tracking {id}</div>
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