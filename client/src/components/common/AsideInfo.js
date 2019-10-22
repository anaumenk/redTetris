import React from "react";
import {Col, Row} from "react-bootstrap";
import { Title } from "./index";

const AsideInfo = (props) => (
  <>
      <Title title={props.title} className="aside-heading" />
      <Row className="aside-content">
          {props.players.map((player, index) => {
              return (
                <Col key={index}>
                    {player.info}
                </Col>
              )
          })}
      </Row>
  </>
);

export default AsideInfo;
