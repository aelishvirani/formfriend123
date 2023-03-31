import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { ReactComponent as MyImage } from '../svgs/group_add_FILL0_wght400_GRAD0_opsz48.svg';
import { ReactComponent as Notification } from '../svgs/add_alert_FILL0_wght400_GRAD0_opsz48.svg';
import { ReactComponent as Delete } from '../svgs/delete_FILL0_wght400_GRAD0_opsz48.svg';


const Tracking = (props) => {
  const [dataGroup, setDataGroup] = useState([]);
  const [filteredData, setFilteredData] = useState({});
  const { propValue } = useParams();

  const[groups,setGroups]= useState([]);
  const[toAdd,setToAdd] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/EditForm/${propValue}`, {
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',
        },
      });
      const actualdata = await res.json();
      setDataGroup(actualdata.group);
    } catch (err) {
      console.log('err');
    }
  };

  const getGroup = async () => {
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/group/GetGroups`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',
        },
      });
      const groups = await res.json();
      console.log(groups);
      console.log(dataGroup);
      // console.log(actualdata.group);
      //remove element from group if it is already in dataGroup
      const diff = groups.filter((x) => !dataGroup.some((y) => x.groupId === y.groupId));
      console.log(diff);
      setGroups(diff);
    } catch (err) {
      console.log(err.message);
    }
  };

  
  const handleFilterData = async () => {
    const filtered = {};
    dataGroup.forEach(async (group, groupIndex) => {
      filtered[groupIndex] = [];
      group.participants.forEach((participant) => {
        if ((participant.seen === true && participant.filled === false) || (participant.seen === false && participant.filled === false)) {
          filtered[groupIndex].push(participant.email);
        }
      });
      
      const reminder={
        "GroupId":`${group.groupId}`,
        "Message":"Test",
        "Participants":filtered[groupIndex],
      }
      console.log(group.groupId);
      console.log(reminder);
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/AddReminder`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',
        },
        body: JSON.stringify(reminder),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    });
    setFilteredData(filtered);
    console.log(filtered);
    console.log(filteredData);
  
  };
  
  const handleSumbitGroup = async () => {
    try {
      toAdd.map(async (group) => {
        
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/AddGroupToForm/`+group+'/'+propValue, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ',

        },
        body: JSON.stringify(group),
      });
      const data = await res.json();
      if(res.status === 200){
        await getData();
      }
    });
  }
    catch (err) {
      console.log(err);
    } 
  };

  
  useEffect(() => {
    getData();
  }, []);

  const addGroup = async () => {
    await getGroup();
    setShowModal(true);
  }

  const handleDelete = (id) => async () => {
    console.log(id);
    try {
      const res = await fetch(`http://formfriend.cleverapps.io/api/form/DeleteGroupFromForm/`+id+'/'+propValue, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYUBnbWFpbC5jb20iLCJlbWFpbCI6ImFAZ21haWwuY29tIiwianRpIjoiNTI4NDdjNmMtMTc0Yi00ZjAzLTljOGEtYmJhZjlkYjBkNWUyIiwibmJmIjoxNjc5ODU2MzYzLCJleHAiOjE2ODIyNzU1NjMsImlhdCI6MTY3OTg1NjM2M30.lT1YLqsgk6vKUm_oO5wigvonyzAEutJphVTNyuR1Zu1bQ4hkIrSk4QgIwHGJcLVjCG42Ba0ykrGD8nvLVp4BtQ'
        },
      });
      const data = await res.json();
      
      if(res.status === 200){
        await getData();
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
  
    <div className='row'>
    <span className='h2 col-md-6'>Groups Linked with Forms</span>
    <div className='col-md-2'></div>
      <button className="btn btn-primary me-md-2 col-md-1" title='Add Group' type="button" onClick={addGroup} style={{width:"fit-content"}}><MyImage/></button>
      <div className='col-md-1'></div>
      <button className="btn btn-primary me-md-2 col-md-1" type="button" title='Send Reminder' onClick={handleFilterData} style={{width:"fit-content"}}><Notification/></button>
      </div>
     <div className="d-grpropValue gap-2 d-md-flex justify-content-md-end">
      </div>
      {dataGroup.map((value, index) => {
        console.log(value)
        return (
          <React.Fragment key={index}>
            <br/>
            <h4>
              <div className='row'>
              <span className='col-md-11'>{index + 1}. {value.groupName}</span>
              <button className='col-md-1 btn btn-danger' onClick={handleDelete(value.groupId)} style={{width:"fit-content",height:"auto"}}><Delete/></button>
              </div>
            </h4>
            <table className="table table-light table-hover" style={{ marginRight: '10px' }}>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "10%" }}>#</th>
                  <th scope="col" style={{ width: "70%" }}>Email</th>
                  <th scope="col" style={{ width: "10%" }}>Seen</th>
                  <th scope="col" style={{ width: "10%" }}>Filled</th>
                </tr>
              </thead>
              <tbody>

                {value.participants.map((data, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td style={{maxWpropValueth:'125px',minWpropValueth:'125px'}}>{data.email}</td>
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Select a value</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form onSubmit={(event) => {
      event.preventDefault();
      handleSumbitGroup();
      setShowModal(false);
    }}>
      <Form.Group>
        {
          //Map datagroup
          groups.map((group) => (
            <Form.Check
              key={group.groupId}
              type="checkbox"
              label={group.groupName}
              id={group.groupId}
              checked={toAdd.includes(group.groupId)}
              onChange={(event) => {
                if (event.target.checked) {
                  setToAdd([...toAdd, group.groupId]);
                } else {
                  setToAdd(toAdd.filter((value) => value !== group.groupId));
                }
              }}
            />
          ))
        }
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

export default Tracking;