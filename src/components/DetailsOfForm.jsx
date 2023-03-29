import React ,{useEffect,useState}from 'react'
import { Link,useParams } from 'react-router-dom';
const DetailsOfForm=(props)=> {
const {id} =useParams(); 
const [data,setData] = useState([]);
const [questionData,setQuestionData] = useState([]);
    const getData = async () => {
        try {
            const res = await fetch(`http://formfriend.cleverapps.io/api/form/EditForm/${id}`,
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
            
            console.log(actualdata.form);
            setData(actualdata.form);
            // setQuestionData(data.Questions);
            setQuestionData(actualdata.form.Questions);

            console.log(data);
            console.log(questionData);
            // console.log(actualdata.form.Questions);
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
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
 <Link to={`/DetailsOfForm/${id}/Tracking`}> <button className="btn btn-primary me-md-2" type="button">Tracking</button></Link>
  <button className="btn btn-primary" type="button">Button</button>
</div>
      <h1>{data.title}</h1>
     <h3> Url id: {data.urlId}</h3>
      <form>

     
       {questionData.map((field)=>{

        return(
          <>
          <div className="row mb-3">
      <label for={field.id} className="col-sm-2 col-form-label">{field.question}: </label>
      <div className="col-sm-5">
      <input type={field.type} className="form-control" id={field.id}/>
     </div>
     </div>
          </>
        )

      })}     
      </form>
    </>
  )
}

export default DetailsOfForm

