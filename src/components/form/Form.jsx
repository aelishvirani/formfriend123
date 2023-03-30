import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {Link, useParams } from "react-router-dom";

export const Forms = () => {
  const [fields, setFields] = useState([]);
  const [question, setQuestion] = useState([]);
  // const [formId,setFormId] = useState()
  const [filteredData, setFilteredData] = useState({});
 var id;

  const getData = async () => {
    try {
      const res = await fetch(
        `http://formfriend.cleverapps.io/api/form/AddNewForm`,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ",
          },
        }
      );
      const actualdata = await res.json();
      // console.log(actualdata.form.id);
      // setFormId(actualdata.form.id)
      const id =actualdata.form.id;
      console.log(id);
      console.log(actualdata.form.Questions);
      setQuestion(actualdata.form.Questions);
      console.log("hii");
      // setDataGroup(actualdata.group);
    } catch (err) {
      console.log("err");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleAddField = () => {
    // setFields([...fields, { name: "", type: "text" }]);
      const newFields = [...fields, { name: "", type: "text" }];
      const newQuestions = [...question, {id: "", question: newFields[newFields.length-1].name, type: newFields[newFields.length-1].type}];
      setFields(newFields);
      setQuestion(newQuestions);
    };
    


  const handleDeleteField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const handleFieldNameChange = (event, index) => {
    const newFields = [...fields];
    newFields[index].name = event.target.value;
    setFields(newFields);
  };

  const handleFieldTypeChange = (event, index) => {
    const newFields = [...fields];
    newFields[index].type = event.target.value;
    setFields(newFields);
  };

  const handlSubmission= async ()=>{
    console.log(fields);
    const submit={
      "Questions": question
      //  [
      //   {
      //       "id": "6cfa862e-ded0-4e1d-ae60-3dd6d372372f",
      //       "question": "",
      //       "photoPath": "",
      //       "options": [
      //           "Option1"
      //       ],
      //       "type": "",
      //   },
      // ]
    };

      console.log(submit);
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/UpdateMeta`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',
        },
        body: JSON.stringify(submit),
      });
      const data = await res.json();
      // console.log(data.type);
      console.log()
    } catch (err) {
      console.log(err);
    }
    
  }

  return (
    <>
      <div className="container mt-5">
        {/* <Link to={`/DetailsOfForm/${id}/Tracking`}><div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="button">
            Traking
          </button>
        </div>
        </Link> */}
        <Form>
          {question.map((field) => {
            return (
              <>
                <div className="row mb-3">
                  <label for={field.id} className="col-sm-2 col-form-label">
                    {field.question}:{" "}
                  </label>
                  <div className="col-sm-5">
                    <input
                      type={field.type}
                      className="form-control"
                      id={field.id}
                    />
                  </div>
                </div>
              </>
            );
          })}

          {fields.map((field, index) => (
            <>
              <div style={{ border: "10px solid black" }}>
                <div className="form-group" key={index}>
                  <Form.Label>Field Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={field.name}
                    onChange={(e) => handleFieldNameChange(e, index)}
                  />

                  <Form.Label className="mt-3">Field Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={field.type}
                    onChange={(e) => handleFieldTypeChange(e, index)}
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="email">Email</option>
                    <option value="password">Password</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </Form.Control>

                  {field.type === "textarea" ? (
                    <Form.Control as="textarea" className="mt-3" />
                  ) : field.type === "radio" ? (
                    <div className="mt-3">
                      <Form.Check
                        inline
                        label="Option 1"
                        type="radio"
                        name={`radio-${index}`}
                      />
                      <Form.Check
                        inline
                        label="Option 2"
                        type="radio"
                        name={`radio-${index}`}
                      />
                      <Form.Check
                        inline
                        label="Option 3"
                        type="radio"
                        name={`radio-${index}`}
                      />
                    </div>
                  ) : field.type === "checkbox" ? (
                    <div className="mt-3">
                      <Form.Check inline label="Option 1" type="checkbox" />
                      <Form.Check inline label="Option 2" type="checkbox" />
                      <Form.Check inline label="Option 3" type="checkbox" />
                    </div>
                  ) : field.type === "date" ? (
                    <Form.Control type="date" className="mt-3" />
                  ) : (
                    <Form.Control type={field.type} className="mt-3" />
                  )}

                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={() => handleDeleteField(index)}
                  >
                    Delete Field
                  </Button>

                  <hr />
                </div>
              </div>
              <br />
            </>
          ))}
        </Form>

        <Button variant="primary" className="mt-3" onClick={handleAddField}>
          Add Field
        </Button>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="button" onClick={handlSubmission}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Forms;
