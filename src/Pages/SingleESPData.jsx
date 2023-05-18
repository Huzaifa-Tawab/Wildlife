import { React, useState, useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import {
  getDocs,
  collection,
  getFirestore,
  getDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { Alert, Col, Form, Modal, Row, Button } from "react-bootstrap";

import { useLocation } from "react-router-dom";
import FirebaseInit from "../FireBase/FirebaseAuth";
import ShedNavbar from "../Components/Navbar";
import EChart from "../Components/Guages";
import Update from "../Components/update";
import Loader from "../Components/Loader";
import Tablerow from "../Components/Tablerow";

function SingleESPData(props) {
  FirebaseInit;
  const dbRef = ref(getDatabase());
  const [Fire, setFire] = useState(false);
  const [OutTemp, setOutTemp] = useState(0);
  const [COlevel, setCOlevel] = useState(0);
  const [OutHumid, setOutHumid] = useState(0);
  const [NewData, setNewData] = useState();
  const [isLoading, setisLoading] = useState();
  const [Show, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [Date, setDate] = useState("");
  const [NextVac, setNextVac] = useState("");
  const [showAllert, setAllertShow] = useState(false);
  const [LogType, setLogType] = useState("");
  const [Logs, setLogs] = useState("");
  const { state } = useLocation();
  const { Uid, name, Deviceid } = state; // Read values passed on state
  const db = getFirestore(FirebaseInit);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Guage

  // Guage end

  // Functions
  useEffect(() => {
    FetchData();
    console.log(Uid);
    const interval = setInterval(() => {
      setOutHumid(0);
      setOutTemp(0);
      getDataFromFirebase();
    }, 5000);
    return () => clearInterval(interval);
  }, [1]);

  async function FetchData() {
    console.log(Uid);
    const querySnapshot = await getDocs(collection(db, Uid));
    let list = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      // console.log("id " + doc.id);
      list.push({
        UID: doc.id,
        Name: doc.data().vac,
        Date: doc.data().Date,
        Next_Date: doc.data().NextDate,
      });
    });
    if (list.length > 0) {
      setisLoading(true);
    }
    console.log(list);
    setNewData(list);
  }
  // Mapping FireBase To Consts
  function getDataFromFirebase() {
    get(child(dbRef, `/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          setFire(snapshot.val().Fire);
          setOutHumid(snapshot.val().Out_H);
          setOutTemp(snapshot.val().Out_T);
          setCOlevel(snapshot.val().CO);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //New Device
  }
  function AddNewVac() {
    try {
      const docRef = addDoc(collection(db, Uid), {
        Name: Name,
        Date: Date,
        NextDate: NextVac,
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
    <div className="singleespdata">
      <ShedNavbar />
      <Update id={Uid} />
      <div className="espmaininfo">
        <div className="espmaininfoentity">
          <p>Database ID</p>
          <span>{Uid}</span>
        </div>
        <div className="espmaininfoentity">
          <p>Animal Name</p>
          <span>{name}</span>
        </div>
        <div className="espmaininfoentity">
          <p>ID Name</p>
          <span>{Deviceid}</span>
        </div>
      </div>
      <div className="loading_1sec"></div>
      <p>Fire : {Fire ? "Yess" : "No"}</p>
      <p>Temperature : {OutTemp} ℃</p>
      <p>Humidity: {OutHumid} %</p>
      <p>CO PPM: {COlevel} PPM</p>
      <div className="box">{/* <EChart></EChart> */}</div>

      <div className="tablecard">
        {isLoading ? (
          <>
            <Button onClick={handleShow}>Add Vac</Button>
            {NewData.map((item, i) => (
              <>
                <Tablerow
                  colid={Uid}
                  docid={item.UID}
                  name={item.Name}
                  date={item.Date}
                  next={item.Next_Date}
                />
              </>
            ))}
          </>
        ) : (
          <Loader
            overlaycolor="rgba(0, 0, 0, 0)"
            color="#000"
            position="abs"
            size={300}
          />
        )}
      </div>

      <>
        <Modal show={Show} onHide={handleClose}>
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
            <Button variant="primary" onClick={AddNewVac}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default SingleESPData;
