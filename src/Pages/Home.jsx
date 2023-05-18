import React, { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import FirebaseInit from "../FireBase/FirebaseAuth";
import ShedNavbar from "../Components/Navbar";
import ESPCard from "../Components/ESPCard";
import Loader from "../Components/Loader";
function Home() {
  const [NewData, setNewData] = useState([]);
  const [isLoading, setisloading] = useState(false);
  const db = getFirestore(FirebaseInit); 

  // Functions
  useEffect(() => {
    FetchData();
  }, []);
  //
  async function FetchData() {
    const querySnapshot = await getDocs(collection(db, "ESP"));
    let list = [];
    querySnapshot.forEach((doc) => {
      list.push({
        UID: doc.id,
        Name: doc.data().Name,
        DeciceID: doc.data().D_ID,
        Dics: doc.data().Dics,
        AdultFemales: doc.data().No_Female,
        AdultMales: doc.data().No_Male,
        Youngs: doc.data().No_Young,
      });
    });
    if (list.length > 0) {
      setisloading(true);
    }
    console.log(list);
    setNewData(list);
  }
  // Functions End

  return (
    <div className="Home">
      <ShedNavbar />
      <div className="Home_Cards">
        {isLoading ? (
          NewData.map((item, i) => (
            <ESPCard
              UID={item.UID}
              Name={item.Name}
              DeciceID={item.DeciceID}
              Dics={item.Dics}
              AdultFemales={item.AdultFemales}
              AdultMales={item.AdultMales}
              Youngs={item.Youngs}
            />
          ))
        ) : (
          <Loader
            overlaycolor="rgba(0, 0, 0, 0)"
            color="#000"
            position="abs"
            size={300}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
