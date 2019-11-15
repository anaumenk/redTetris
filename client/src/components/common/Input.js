import { Col, Form, Row } from "react-bootstrap";
import React from "react";

const Input = (props) => (
  <Form.Group as={Row}>
    <Col sm={2}>
      <Form.Label>
        {props.title}
      </Form.Label>
    </Col>
    <Col sm={10}>
      <Form.Control type={props.type} onChange={props.onChange} name={props.name}/>
    </Col>
  </Form.Group>
);

export default Input
