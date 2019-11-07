import React from "react";
import { Row } from "react-bootstrap";
import { Title } from "./index";

const AsideInfo = (props) => (
  <>
    <div className="aside-heading">
      {props.title.map((title, index) => <Title key={index} title={title}/>)}
    </div>
    <Row className="aside-content">
        {props.info}
    </Row>
  </>
);

export default AsideInfo;
