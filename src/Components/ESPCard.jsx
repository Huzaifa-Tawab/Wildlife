import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Update from "./update";
function ESPCard(props) {
  const navigate = useNavigate();

  function HandleNavigation() {
    navigate("/ESP", {
      state: { Uid: props.UID, name: props.Name, Deviceid: props.DeciceID },
    });
  }
  return (
    <Card style={{ width: "25rem", height: "30rem" }}>
      <Card.Body>
        {/* {props.Name}
        {props.UID}
        {props.DeciceID}
        {props.Dics}
        {props.AdultFemales}
        {props.AdultMales}
        {props.Youngs} */}

        <Card.Title className="spsbtwn">
          {/* <Button variant="primary">
            Primary <Update />
          </Button> */}
          {props.Name} <Badge bg="info">Vacinated</Badge>
        </Card.Title>
        <Card.Text style={{ height: "300px", overflow: "scroll" }}>
          {props.Dics}
        </Card.Text>
        <div className="noofanimals">
          <Row>
            <Col>
              <span>{props.AdultMales} Male</span>
            </Col>

            <Col>
              <span>{props.AdultFemales} Female</span>
            </Col>
            <Col>
              <span>{props.Youngs} Young</span>
            </Col>
          </Row>
        </div>
        <Button
          variant="primary"
          style={{ width: "10rem" }}
          onClick={HandleNavigation}
        >
          Go
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ESPCard;
