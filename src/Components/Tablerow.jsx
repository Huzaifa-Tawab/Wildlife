import { React, useState } from "react";
import TableUpdate from "./TableData";
import { Alert, Col, Modal, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import FirebaseInit from "../FireBase/FirebaseAuth";

function Tablerow(props) {
  const db = getFirestore(FirebaseInit);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [Device, setDevice] = useState("");
  const [NextVac, setNextVac] = useState("");
  const [show, setShow] = useState(false);
  const [Logs, setLogs] = useState("");
  const [LogType, setLogType] = useState("");
  const [showAllert, setAllertShow] = useState(false);
  const id = props.colid;
  const docid = props.docid;
  const name = props.name;
  const date = props.date;
  const nextvac = props.next;

  //New Device
  function AddDeviceNew() {
    try {
      const docRef = addDoc(collection(db, id), {
        Name: name,
        Date: date,
        NextDate: nextvac,
      });
      console.log(docRef);
      setLogs("New Device Added");
      window.location.reload(false);
    } catch (e) {
      setLogType("danger");
      setLogs("Error: " + e);
    }

    setAllertShow(true);
  }

  return (
    <>
      <div className="tablehead"></div>
      <div className="tablerow">
        {/* <button className="btn btn-danger" onClick={addRowTable}>
          Insert Row
        </button> */}

        <div className="col1">
          <span>{name}</span>
        </div>
        <div className="col2">
          <span>{date}</span>
        </div>
        <div className="col3">
          <span>{nextvac}</span>
        </div>
        <div className="col4">
          <TableUpdate />
        </div>
      </div>

      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New</Modal.Title>
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Vaccine Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="datetime"
                      placeholder="Date"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="datetime"
                      placeholder="Next Vaccine"
                      onChange={(e) => setNextVac(e.target.value)}
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
            <Button variant="primary" onClick={AddDeviceNew}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default Tablerow;
