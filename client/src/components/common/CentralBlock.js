import React from "react";
import { Col, Row } from "react-bootstrap";
import { ButtonRef, Title } from "./";
import { ROUTES } from "../../constants";
import { FaTimes } from "react-icons/fa";

const CentralBlock = ({ close, title, children }) => (
  <Row className="homepage">
      <Col md={7} className="container">
        {close && (
          <ButtonRef
            to={ROUTES.MENU}
            className="close-button"
          />
        )}
          <Title title={title} />
          {children}
      </Col>
  </Row>
);

export default CentralBlock;
