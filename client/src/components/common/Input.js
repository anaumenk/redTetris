import { Form } from "react-bootstrap";
import React from "react";

const Input = ({ title, type, onChange, name }) => (
  <Form.Group>
      <Form.Label column={false}>{title}</Form.Label>
      <Form.Control type={type} onChange={onChange} name={name}/>
  </Form.Group>
);

export default Input;
