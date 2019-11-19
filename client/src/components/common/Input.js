import { Col, Form, Row } from "react-bootstrap";
import React from "react";

const Input = ({ title, type, onChange, name }) => (
  <Form.Group as={Row}>
    <Col sm={2}>
      <Form.Label>{title}</Form.Label>
    </Col>
    <Col sm={10}>
      <Form.Control type={type} onChange={onChange} name={name}/>
    </Col>
  </Form.Group>
);

export default Input
