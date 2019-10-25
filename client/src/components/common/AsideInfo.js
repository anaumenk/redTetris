import React from "react";
import {Col, Row} from "react-bootstrap";
import { Title } from "./index";

const AsideInfo = (props) => (
  <>
    <div className="aside-heading">
      {props.title.map((title, index) => <Title key={index} title={title}/>)}
    </div>
      <Row className="aside-content">
          {props.info.map((item, index) => (
              <Col key={index} sm="6">
                  {Object.values(item).map((element, i) => <div key={i}>{element.info}</div>)}
              </Col>
          ))}
      </Row>
  </>
);

export default AsideInfo;
