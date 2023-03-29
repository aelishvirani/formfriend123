import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const Forms = () => {
  const [fields, setFields] = useState([]);

  const handleAddField = () => {
    setFields([...fields, { name: "", type: "text" }]);
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

  return (
    <div className="container mt-5">
      <Form>
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
    </div>
  );
};

export default Forms;

