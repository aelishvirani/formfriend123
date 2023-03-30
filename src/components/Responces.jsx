import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
const Responces=(props)=>{
    const { propValue } = useParams();

    
//   const [dataGroup,setGroupData] = useState([]);
//   const [total,setTotal] = useState(0);
  const getData = async () => {
      try {
        //   const res = await fetch(`http://formfriend.cleverapps.io/api/form/EditForm/${propValue}`,
          const res = await fetch(`http://formfriend.cleverapps.io/api/form/EditForm/${propValue}`,
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
          console.log(actualdata)
          console.log(actualdata.Responses);
          // console.log(actualdata.Responses);
        //   setGroupData(actualdata);

      }
      catch (err) {
          console.log("err");
      }
  }

  useEffect(() => {
      getData();
  },[])
  return (
    <div>Responces {propValue}</div>
  )
}

export default Responces;