import React,{useState,useEffect} from 'react'
import { useParams ,useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';
const Responces=(props)=>{
    const { propValue } = useParams();
    var navigate = useNavigate();
    const token = Cookies.get("token");
  
    const check = () =>{
      if(token==undefined)
      {
        window.location.href = "/";
        navigate("/");
      }
      }
    
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
        Authorization: "Bearer " + token 
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
    check();
      getData();
  },[])
  return (
    <div>Responces {propValue}</div>
  )
}

export default Responces;