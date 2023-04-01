import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const Reminder = () => {
  const [reminds, setReminds] = useState([]);
  const navigate = useNavigate();
//   const [forseen,setForseen] = useState()
  const getData = async () => {
    try {
      const res = await fetch(
        "http://formfriend.cleverapps.io/api/form/ReminderList",
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiMDhkOWE0MjktNGQzMS00ODM1LWE3MDEtNDc2YWQ3NjMwZWYzIiwibmJmIjoxNjgwMjYyMjExLCJleHAiOjE2ODI2ODE0MTEsImlhdCI6MTY4MDI2MjIxMX0.UeF2GhpUQ10wiMALtZ7OU7txEJ7FK1L5Li0RQASwRsZifYfF8dwKkp0NTPiIPG3x0254Ab12RReMrgu9woV7Ig",
          },
        }
      );
      const actualdata = await res.json();
      setReminds(actualdata);
      console.log(actualdata);
    } catch (err) {
      console.log("err");
    }
  };
  const getSeen = async (e) => {
    
    // try {
    //   const res = await fetch(
    //     `http://formfriend.cleverapps.io/api/form/ViewReminder/${e.id}`,
    //     {
    //      method :"PUT",
    //       mode: "cors",
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Content-Type": "application/json",
    //         Authorization:
    //           "Bearer " +
    //           "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiMDhkOWE0MjktNGQzMS00ODM1LWE3MDEtNDc2YWQ3NjMwZWYzIiwibmJmIjoxNjgwMjYyMjExLCJleHAiOjE2ODI2ODE0MTEsImlhdCI6MTY4MDI2MjIxMX0.UeF2GhpUQ10wiMALtZ7OU7txEJ7FK1L5Li0RQASwRsZifYfF8dwKkp0NTPiIPG3x0254Ab12RReMrgu9woV7Ig",
    //       },
    //     }
    //   );
    //   const actualdata = await res.json();
    //   if(res.status===200){
        navigate(`/UserForm/${e.formId}`)
    //   }
    // } catch (err) {
    //   console.log("err");
    // }
  };
  useEffect(() => {
    getData();
  }, []);

  const setForseen=(e,f)=>{
    getSeen(e);
    navigate();
  }
  return (
    <>
      {reminds.map((responce, index) => {
        const form=responce.formId;
        return (
          <>

          <Link to={`/UserForm/${responce.formId}`}>
            <div class="card" style={{marginRight:'20px'}} >
              <div class="card-body">
                <p>Notification from {responce.adminName}</p>
                <p> {responce.message}</p>
              </div>
            </div>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default Reminder;
