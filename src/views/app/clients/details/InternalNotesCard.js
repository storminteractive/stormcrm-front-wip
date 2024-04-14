//import React, { useState, useEffect } from 'react'
import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { Button, Card, CardBody, FormGroup } from "reactstrap";


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image"],
    ["clean"]
  ]
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image"
];

export default function BookingsCard({ internalNotes, customerId, handleUpdateNotes }) {

  const [notes, setNotes] = useState(internalNotes);

  useEffect(() => {
    setNotes(internalNotes);
  }, [internalNotes]);

  return (
    <Card className="mb-4" >
      <CardBody>
        <div className="mb-5">
          <div className="d-flex flex-row align-items-center mb-3">
            <NavLink to={'/app/clients/edit/' + customerId}>
              <i className="large-icon initial-height iconsminds-pen"></i>
            </NavLink>
            <div className="pl-3 pt-2 pr-2 pb-2">
              <p className="list-item-heading mb-1">Internal notes</p>
            </div>
          </div>
          <FormGroup>
            <ReactQuill
              theme="snow"
              value={notes}
              onChange={(newNotes) => setNotes(newNotes)}
              modules={quillModules}
              formats={quillFormats}
            />
            <Button color="primary" block style={{ 'marginTop': 10 }} onClick={(e) => handleUpdateNotes(customerId, notes)}>
              Save notes
            </Button>
          </FormGroup>

        </div>
      </CardBody>
    </Card>
  )
}