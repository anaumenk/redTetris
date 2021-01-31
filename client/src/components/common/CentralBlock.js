import { ButtonRef, Title } from "./";
import { Col, Row } from "react-bootstrap";
import { ROUTES } from "../../constants";
import React from "react";

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
