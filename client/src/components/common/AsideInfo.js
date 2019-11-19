import React from "react";
import { Row } from "react-bootstrap";
import { Title } from "./index";

const AsideInfo = ({title, info}) => (
  <>
    <div className="aside-heading">
      {title.map((title, index) => <Title key={index} title={title}/>)}
    </div>
    <Row className="aside-content">{info}</Row>
  </>
);

export default AsideInfo;
