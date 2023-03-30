import React,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import Form from '../components/form/Form'
function Dashboard() {

const [data,setData] = useState([]);
    const getData = async () => {
        try {
            const res = await fetch('http://formfriend.cleverapps.io/api/form/AllForms',
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
            console.log(data);
            setData(actualdata);
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

<div className="row">
  <div className="col-md-3 mt-3 mb-3 mb-sm-0">
    <div className="card">
      <div className="card-body">
        <p className="card-text" style={{textAlign:'center'}}><Link to='/form'><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
</svg></Link></p>
        <h5 className="card-title" style={{textAlign:'center'}}>Add New form</h5>
        
      </div>
    </div>
  </div>
  <div className="col-md-3 mt-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div className="col-md-3 mt-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div className="col-md-3 mt-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  
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
        <h5 className="card-title">{value.formName}</h5>
        {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
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