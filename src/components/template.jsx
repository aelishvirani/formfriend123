import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {Link, useParams,useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
 const Template = (props) => {

  const {propValue} = useParams();
  const navigate = useNavigate();
  const token = Cookies.get("token");
  
  const check = () =>{
    if(token==undefined)
    {
      window.location.href = "/";
      navigate("/");
    }
    }
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
              token
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
    check();
    getData();
},[])

  return null;
};

export default Template;
