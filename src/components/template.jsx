import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {Link, useParams,useNavigate } from "react-router-dom";

 const Template = (props) => {

  const {propValue} = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const res = await fetch(
        `http://formfriend.cleverapps.io/api/form/AddNewTemplate/${propValue}`,
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
      if(res.ok){
        console.log(actualdata);
        const propvalue = actualdata.form.id;
        navigate('/DetailsOfForm/'+propvalue)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
},[])

  return null;
};

export default Template;
