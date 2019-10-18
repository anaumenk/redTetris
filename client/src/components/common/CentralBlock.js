import React from "react";
import {Col, Row} from "react-bootstrap";
import {Title} from "./";

const CentralBlock = (props) => (
  <Row className="homepage align-items-center">
      <Col md={7} className="container">
          <Title title={props.title} />
          {props.children}
      </Col>
  </Row>
);

export default CentralBlock;
