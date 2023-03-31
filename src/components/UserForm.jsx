import React, { useState } from 'react'
import { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const UserForm=(props)=> {
    const {propValue} = useParams();
    const [fields, setFields] = useState([]);
    const [question, setQuestion] = useState([]);
    const[formName,setFormName] = useState("");
    const[title,setTitle] = useState("");
    const[description,setDescription] = useState("");
    const [form,setForms]  = useState([]);
    const[data,setData] = useState({});
    const getForm = async () => {
        try {
            const res = await fetch(`http://formfriend.cleverapps.io/api/form/ViewForm/${propValue}`,
              {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiZTI5ZGVmNGUtMjdmNy00YjZjLTlhNjQtMzMzMDI3ZjE0MzJiIiwibmJmIjoxNjgwMjUzNjA1LCJleHAiOjE2ODI2NzI4MDUsImlhdCI6MTY4MDI1MzYwNX0.DgF18Dzd1K5uFwqUnv-kFyMX6u0zalZdZNC7pYPC88jpTwSdkLg4RrjwccLGt5sZvHjn2Isgy7809Hf1MUIQ4Q"
        },
      }
            );
            const actualdata = await res.json();
            // console.log(actualdata);
            setData(actualdata);
            setFields(actualdata.Questions)
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getForm();
    },[])
  return (
    <>
      <Form>
       <h2>{data.title}</h2>
        <br/>
        <h4>{data.description} </h4>
        <br/>
          {fields.map((field, index) => (
            <>
              <div style={{ border: "2px solid black",padding:'4px',paddingLeft:'12px',borderRadius:"6px" }}>
                <div className="form-group" key={index}>
                <label>{field.question} </label>
                  

                  {field.type.toLowerCase() === "textarea" ? (
                    <Form.Control as="textarea" className="mt-3" />
                  ) : field.type.toLowerCase() === "radio" ? (
                    <div className="mt-3">
                      {field.options.map((option, index) => (
                        <Form.Check
                          inline
                          label={option}
                          type="radio"
                          name={`radio-${index}`}
                        />
                      ))}
                    </div>
                  ) : field.type.toLowerCase() === "checkbox" ? (
                    <div className="mt-3">
                      {field.options.map((option, index) => (
                        <Form.Check
                          inline
                          label={option}
                          type="checkbox"
                          name={`checkbox-${index}`}
                        />
                      ))}
                    </div>
                  ) : field.type.toLowerCase() === "date" ? (
                    <Form.Control type="date" className="mt-3" />
                  ) : (
                    <Form.Control type={field.type} className="mt-3" />
                  )}
                  <hr />
                </div>
              </div>
              <br />
            </>
          ))}
          <Button>Submit</Button>
        </Form>

    </>
  )
}

export default UserForm;