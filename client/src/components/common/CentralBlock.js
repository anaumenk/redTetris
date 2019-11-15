import React from "react";
import { Col, Row } from "react-bootstrap";
import { ButtonRef, Title } from "./";
import { ROUTES } from "../../constants";
import { FaTimes } from "react-icons/fa";

const CentralBlock = (props) => (
  <Row className="homepage align-items-center">
      <Col md={7} className="container">
        {props.close && (
          <ButtonRef
            variant="secondary"
            to={ROUTES.MENU}
            className="close-button"
          >
            <FaTimes/>
          </ButtonRef>
        )}
          <Title title={props.title} />
          {props.children}
      </Col>
  </Row>
);

export default CentralBlock;
