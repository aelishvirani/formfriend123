import React,{useState , useEffect} from 'react'
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Form from '../components/form/Form'
import './Dashboard.css';
import Cookies from "js-cookie";
function Dashboard() {
  var navigate = useNavigate();
  const token = Cookies.get("token");
  if(token===undefined)
  {
    navigate("/");
  }
  console.log(token);
const [data,setData] = useState([]);
const [templateData,setTemplateData] = useState([])
    const getData = async () => {
        try {
            const res = await fetch('http://formfriend.cleverapps.io/api/form/AllForms',
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
            setData(actualdata);
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const getTemplateData = async () => {
      try {
          const res = await fetch('http://formfriend.cleverapps.io/api/form/GetTemplate',
            {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token 
      },
    }
          );
          const tempData = await res.json();
          // setData(actualdata);
          console.log(tempData);
          setTemplateData(tempData);
      }
      catch (err) {
          console.log(err);
      }
  }

    useEffect(() => {
        getData();
        getTemplateData();
    },[])




  return (
<>

<div className="row">
  <div className="col-md-3 mt-3 mb-3 mb-sm-0">
        <Link to='/form'>
    <div className="card">
      <div className="card-body">
        <p className="card-text" style={{textAlign:'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg>
</p>
        <h5 className="card-title" style={{textAlign:'center'}}>Add New form</h5>
        
      </div>
    </div>
</Link>
  </div>
{templateData.map((temp,index)=>{
  const propValue= temp.templateId;
  {/* console.log(temp); */}
  {/* console.log(propValue); */}
  return(
    <>
  <div className="col-md-3 mt-3">
  <Link to={`/addTemplate/${propValue}`}>
    <div className="card" style={{height:"100%"}}>
      <div className="card-body">
        <h5 className="card-title">{temp.formName}</h5>
        <p className="card-text" style={{fontWeight:'lighter'}}>{temp.description}</p>
      </div>
        
    </div>
    </Link>
  </div></>)

})}


</div>
<hr style={{width:'100%',textAlign:'left',marginLeft:'0'}}/>
<br/>



<h1>Recent Form</h1>

<div className="row">
{data.map((value,index)=>{
  const propValue = value.id;
  return(
    <>
    <div className="col-md-4 mt-3 mb-3 mb-sm-0" key={value.id}>
    <div className="card">
    
    <Link to={`/DetailsOfForm/${propValue}`}>
      <div className="card-body">
        <p className="card-title" style={{fontSize:'22px',fontWeight:'bold'}}>{value.formName}</p>
        <div style={{margin:'0px',paddingTop:'8px'}}>
        <p style={{fontSize:'18px',margin:'0px',paddingTop:'0px',}}>Create on : {value.lastEdited.substring(0,10)}</p>
        <p style={{fontSize:'18px',margin:'0px',paddingTop:'5px',}}>Last Edited :{value.createdOn.substring(0,10)}</p>
       
        </div>
      </div>
  </Link>
    </div>
  </div>
    </>
  )

})} 
</div>

{/* <hr style={{width:'100%',textAlign:'left',marginLeft:'0'}}/>
<br/> */}
</>
  )
}

export default Dashboard