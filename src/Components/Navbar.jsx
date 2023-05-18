import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Alert, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import FirebaseInit from "../FireBase/FirebaseAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
function ShedNavbar() {
  const db = getFirestore(FirebaseInit);
  const navigate = useNavigate();
  function HandleLogout() {
    localStorage.setItem("User", false);
    // secureLocalStorage.setItem("User", true);
    // secureLocalStorage.setItem("UserName", user);
    navigate("/");
  }
  const [show, setShow] = useState(false);
  const [showAllert, setAllertShow] = useState(false);
  const [Logs, setLogs] = useState("");
  const [LogType, setLogType] = useState("");
  const [Device, setDevice] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [AName, setAName] = useState("");
  const [Description, setDescription] = useState("");
  const [Male, setMale] = useState("");
  const [Female, setFemale] = useState("");
  const [Age, setAge] = useState("");
  // User
  const Email = localStorage.getItem("Email");
  //Reset Password
  const auth = getAuth();

  function ResetPassword() {
    console.log(Email);
    sendPasswordResetEmail(auth, Email)
      .then(() => {
        alert("Reset password send to mail");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
  //New Device
  function AddDeviceNew() {
    if (Device != "") {
      try {
        const docRef = addDoc(collection(db, "ESP"), {
          Device: Device,
          Name: AName,
          Decs: Description,
          No_Male: Male,
          No_Female: Female,
          No_Young: Age,
        });
        setLogs("New Device Added");
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
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Shed Management</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#Home">Home</Nav.Link>
                  <Nav.Link onClick={handleShow}>Add New</Nav.Link>
                  <NavDropdown
                    title="Settings"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={ResetPassword}>
                      Change Password
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link onClick={HandleLogout}>Logout</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        //
      ))}
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
                <Form.Label>Pheasant/Animal Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eagle,Duck,Tiger"
                  onChange={(e) => setAName(e.target.value)}
                  autoFocus
                />
                <br />
                <Form.Label>ESP Device ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Home,Shed_1"
                  onChange={(e) => setDevice(e.target.value)}
                  aria-describedby="DeviceIdLabel"
                />
                <Form.Text id="DeviceIdLabel" muted>
                  Device ID must be same as declared in ESP8266
                </Form.Text>
                <br />
                <Form.Label>Dicscription</Form.Label>
                <Form.Control
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
                      onChange={(e) => setMale(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Female"
                      onChange={(e) => setFemale(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="number"
                      placeholder="Young"
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
            <Button variant="primary" onClick={AddDeviceNew}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
}

export default ShedNavbar;
