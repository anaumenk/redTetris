import { Row } from "react-bootstrap";
import React from "react";

const Title = ({ title }) => (
  <Row className={`justify-content-center title-center`}>
      <h1>{title}</h1>
  </Row>
);

export default Title;
