import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button, Form, Toast } from "react-bootstrap";
const GroupView = () => {
  const { propValue } = useParams();
  const [group, setGroup] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[toAdd,setToAdd] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch(
        `http://formfriend.cleverapps.io/api/group/GetGroup/${propValue}`,
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
      console.log(actualdata.groupParticipant);
      console.log(actualdata);
      setGroup(actualdata);
      setParticipants(actualdata.groupParticipant);
    } catch (err) {
      console.log("err");
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const addMember = async () => {
    setShowModal(true);
  };

  const handleSumbitMember = async () => {
    var groupParticipants = document.getElementById("inputParticipants").value;
    groupParticipants = groupParticipants.split(" ");

    try {
      const res = await fetch(
        `http://formfriend.cleverapps.io/api/group/AddMemberToGroup/${propValue}`,
        {
          method: 'PUT',
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ",
          },
          body: JSON.stringify(groupParticipants),
        }
      );
      const actualdata = await res.json();
      const data = res.status;
      if(data==200)
      {
        //redirect to group page
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMember= async ()=>{
    try {
      const res = await fetch(
        `http://formfriend.cleverapps.io/api/group/DeleteMemberFromGroup/${propValue}`,
        {
          method: 'DELETE',
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ",
          },
          body: JSON.stringify(toAdd),
        }
      );
      const actualdata = await res.json();
      const data = res.status;
      if(data==200)
      {
        // setToAdd();
        //redirect to group page
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {" "}
      <div>GroupView {propValue}</div>
      <h1>{group.groupName}</h1>
      <h3>{group.date}</h3>
      <p>{group.description}</p>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary me-md-2"
          type="button"
          onClick={addMember}
        >
          Add Member
        </button>
        <button className="btn btn-primary" type="button" onClick={deleteMember}>
          Delete
        </button>
      </div>
      <table
        className="table table-light table-hover"
        style={{ marginRight: "10px" }}
      >
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">email</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((memb, index) => {
            return (
              <>
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{memb}</td>
                 <td> <input id={index}  type='checkbox' checked={toAdd.includes(memb)}  onChange={(event) => {
                if (event.target.checked) {
                  setToAdd([...toAdd, memb]);
                  console.log(toAdd)
                } else {
                  setToAdd(toAdd.filter((value) => value !== memb));
                }
              }}/></td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select a value</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleSumbitMember();
              setShowModal(false);
            }}
          >
            <Form.Group>
              <div className="row mb-3">
                <label
                  for="inputDescription"
                  className="col-sm-5 col-form-label"
                >
                  Group Participants :
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="textarea"
                    className="form-control"
                    id="inputParticipants"
                  ></textarea>
                </div>
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add to database
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      
    </>
  );
};

export default GroupView;
