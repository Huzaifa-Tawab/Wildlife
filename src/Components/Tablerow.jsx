import { React, useState } from "react";
import { Alert, Col, Modal, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import FirebaseInit from "../FireBase/FirebaseAuth";

function Tablerow(props) {
  const db = getFirestore(FirebaseInit);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Name, setName] = useState(props.name);
  const [Date, setDate] = useState(props.date);
  const [NextVac, setNextVac] = useState(props.next);
  const [show, setShow] = useState(false);
  const [Logs, setLogs] = useState("");
  const [LogType, setLogType] = useState("");
  const [showAllert, setAllertShow] = useState(false);
  const id = props.colid;
  const docid = props.docid;

  //Update Data
  async function UpdateData() {
    try {
      console.log("ID" + id);
      console.log("DID" + docid);
      const Docref = doc(db, id, docid);
      await updateDoc(Docref, {
        Name: Name,
        Date: Date,
        NextDate: NextVac,
      });
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
          <span>{Name}</span>
        </div>
        <div className="col2">
          <span>{Date}</span>
        </div>
        <div className="col3">
          <span>{NextVac}</span>
        </div>
        <div className="col4">
          <button onClick={handleShow}> test</button>
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
                      value={Name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="datetime"
                      placeholder="Date"
                      value={Date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="datetime"
                      placeholder="Next Vaccine"
                      value={NextVac}
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
            <Button variant="primary" onClick={UpdateData}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default Tablerow;
