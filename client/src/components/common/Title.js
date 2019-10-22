import {Row} from "react-bootstrap";
import React from "react";

const Title = (props) => (
  <Row className={`justify-content-center ${props.className}`}>
      <h1>{props.title}</h1>
  </Row>
);

export default Title;
