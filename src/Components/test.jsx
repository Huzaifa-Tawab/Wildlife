import React from "react";
import FirebaseInit from "../FireBase/FirebaseAuth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
function Test() {
  const db = getFirestore(FirebaseInit);
  try {
    const docRef = addDoc(collection(db, "ESP"), {
      Device: "",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

 
  return <div>Test</div>;
}

export default Test;
