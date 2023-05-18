import React from "react";
import { Alert, Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import FirebaseInit from "../FireBase/FirebaseAuth";

function Update(props) {
  FirebaseInit;
  const db = getFirestore(FirebaseInit);
  const [show, setShow] = useState(false);
  const [Logs, setLogs] = useState("");
  const [LogType, setLogType] = useState("");
  const [showAllert, setAllertShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Device, setDevice] = useState("");
  const [AName, setAName] = useState("");
  const [Description, setDescription] = useState("");
  const [Male, setMale] = useState(0);
  const [Female, setFemale] = useState(0);
  const [Age, setAge] = useState(0);

  async function fetch() {
    const docRef = doc(db, "ESP", props.id);
    await updateDoc(docRef, {
      id: "true",
    });
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      setAName(docSnap.data().Name);
      setDevice(docSnap.data().Device);
      setDescription(docSnap.data().Decs);
      setMale(docSnap.data().No_Male);
      setFemale(docSnap.data().No_FeMale);
      setAge(docSnap.data().No_Young);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  fetch();

  async function UpdateDevice() {
    if (Device != "") {
      try {
        const docRef = doc(db, "ESP", props.id);
        await updateDoc(docRef, {
          Device: Device,
          Name: AName,
          Decs: Description,
          No_Male: Male,
          No_Female: Female,
          No_Young: Age,
        });
        setLogs("Device Updated Successfully");
        window.location.reload(false);
      } catch (e) {
        setLogType("danger");
        setLogs("Error: " + e);
      }
    } else {
      setLogType("danger");
      setLogs("Cannot Be empty");
    }
    setAllertShow(true);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        {showAllert ? (
          <Alert
            variant={LogType}
            onClose={() => setAllertShow(false)}
            dismissible
          >
            <Alert.Heading>{Logs}</Alert.Heading>
          </Alert>
        ) : (
          <></>
        )}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Pheasant/Animal Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eagle,Duck,Tiger"
                value={AName}
                onChange={(e) => setAName(e.target.value)}
                autoFocus
              />
              <br />
              <Form.Label>ESP Device ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Home,Shed_1"
                value={Device}
                onChange={(e) => setDevice(e.target.value)}
                aria-describedby="DeviceIdLabel"
              />
              <Form.Text id="DeviceIdLabel" muted>
                Device ID must be same as declared in ESP8266
              </Form.Text>
              <br />
              <Form.Label>Dicscription</Form.Label>
              <Form.Control
                value={Description}
                as="textarea"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
              <br />
              <Form.Label>Number Of Pheasant/Animal</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Male"
                    value={Male}
                    onChange={(e) => setMale(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Female"
                    value={Female}
                    onChange={(e) => setFemale(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Young"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateDevice}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Update;
