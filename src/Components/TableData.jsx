import React from "react";
import { Alert, Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import FirebaseInit from "../FireBase/FirebaseAuth";

function TableUpdate(props) {
  const id = props.id;
  const name = props.name;
  const date = props.date;
  const nextvac = props.next;
  //   FirebaseInit;
  //   const db = getFirestore(FirebaseInit);
  const [show, setShow] = useState(false);
  const [Logs, setLogs] = useState("");
  const [LogType, setLogType] = useState("");
  const [showAllert, setAllertShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [NextVac, setNextVac] = useState("");

  //   async function fetch() {
  //     const docRef = doc(db, "ESP", props.id);
  //     await updateDoc(docRef, {
  //       id: "true",
  //     });
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       // console.log("Document data:", docSnap.data());
  //       setName(docSnap.data().Name);
  //       setDate(docSnap.data().Date);
  //       setNextVac(docSnap.data().NextVac);
  //     } else {
  //       // doc.data() will be undefined in this case
  //       console.log("No such document!");
  //     }
  //   }
  //   fetch();

  //   async function UpdateRow() {
  //     if (Device != "") {
  //       try {
  //         const docRef = doc(db, "ESP", props.id);
  //         await updateDoc(docRef, {
  //           Name: Name,
  //           Date: Date,
  //           NextVac: NextVac,
  //         });
  //         setLogs("Device Updated Successfully");
  //         // window.location.reload(false);
  //       } catch (e) {
  //         setLogType("danger");

  //         setLogs("Error: " + e);
  //       }
  //     } else {
  //       setLogType("danger");

  //       setLogs("Cannot Be empty");
  //     }

  //     setAllertShow(true);
  //   }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
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
              <Form.Label>Vaccine</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Vaccine"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="datetime"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="datetime"
                    placeholder="Next Vac"
                    value={nextvac}
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
          <Button variant="primary" onClick={""}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TableUpdate;
