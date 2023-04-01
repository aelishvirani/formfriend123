import React ,{useEffect,useState}from 'react'
import { Form, Button } from "react-bootstrap";
import { Link,useParams,useLocation,useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const DetailsOfForm=()=> {
  const navigate = useNavigate();
  const { propValue } = useParams();
  console.log(propValue);
  const [fields, setFields] = useState([]);
  const [question, setQuestion] = useState([]);
  const[formName,setFormName] = useState("");
  const[title,setTitle] = useState("");
  const[description,setDescription] = useState("");
  const [form,setForms]  = useState([]);
  // const [formId,setFormId] = useState()
  const [filteredData, setFilteredData] = useState({});
  const token = Cookies.get("token");
  const check = () =>{
    if(token==undefined)
    {
      window.location.href = "/";
      navigate("/");
    }
    }
    useEffect(()=>{
      check()
    },[])
  const getData = async () => {
    try {
      const res = await fetch(
        `http://formfriend.cleverapps.io/api/form/EditForm/`+propValue,
        {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + token
          },
        }
      );
      const actualdata = await res.json();
      console.log(actualdata);
      // console.log(actualdata.form.id);
      // setFormId(actualdata.form.id)
      setForms(actualdata.form);
      setDescription(actualdata.form.description);
      setTitle(actualdata.form.title);
      setFormName(actualdata.form.formName);
      const id =actualdata.form.id;
      console.log(id);
      console.log(actualdata.form.Questions);
      setQuestion(actualdata.form.Questions);
      setFields(actualdata.form.Questions)
      console.log("hii");
      console.log(actualdata.form.Questions);
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
      const newFields = [...fields, { question: "Untitled Question", type: "text" }];
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
    newFields[index].question = event.target.value;
    setFields(newFields);
  };

  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFieldTypeChange = (event, index) => {
    const newFields = [...fields];
    newFields[index].type = event;
    setFields(newFields);
  };

  const handlSubmission= async ()=>{
    console.log(fields);
    const submit={
      "id": form.id,
      "Creator": form.Creator,
      "urlId": form.urlId,
      "formName": formName,
      "title": title,
      "description": description,
      "questions": fields,
      "css":form.css,
    };

      console.log(submit);
    try {

      const res = await fetch(`http://formfriend.cleverapps.io/api/form/UpdateMeta`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(submit),
      });
      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
    
  }

  return (
    <>
    <p>Form Link : {`http://localhost:3001/UserForm/${form.urlId}`}</p>
    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
    <Link to={`/DetailsOfForm/${propValue}/Tracking`}> <button className="btn btn-primary me-md-2" type="button">Tracking</button></Link>
    </div>
      <div className="container mt-5">
        {/* <Link to={`/DetailsOfForm/${id}/Tracking`}><div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary me-md-2" type="button">
            Traking
          </button>
        </div>
        </Link> */}
        <Form>
        <label>Form Name : </label>
        <Form.Control
          type="text"
          value={formName}
          onChange={(e) => handleFormNameChange(e)}
        /><br/>
        <label>Title : </label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e)}
        /><br/>
        <label>Description : </label>
          <Form.Control
            type="textarea"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          /><br/>
          {fields.map((field, index) => (
            <>
              <div style={{ border: "2px solid black",padding:'4px',paddingLeft:'12px',borderRadius:"6px" }}>
                <div className="form-group" key={index}>
                <label>Field Name : </label>
                  <Form.Control
                    type="text"
                    value={field.question}
                    onChange={(e) => handleFieldNameChange(e, index)}
                  />
                  <br/>
                  <label>Field Type : </label>
                  <Form.Control
                    as="select"
                    value={field.type.toLowerCase()}
                    onChange={(e) => handleFieldTypeChange(e.target.value, index)}
                  >
                    <option value="text">Text</option>
                    <option value="textarea">Textarea</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">Checkbox</option>
                  </Form.Control>

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
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          <button className="btn btn-primary" type="button" onClick={handlSubmission}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailsOfForm

