import React, { useState, useEffect } from "react";
import { CircleLoader } from "react-spinners";
function Loader(props) {
  const overlaycolor = props.overlaycolor;
  const color = props.color;
  const size = props.size;
  console.log(overlaycolor);
  const [Position, setPosition] = useState("");
  useEffect(() => {
    if (props.position) {
      if (props.position === "abs") {
        setPosition("Loader-absolute");
      }
      if (props.position === "rel") {
        setPosition("Loader-relative");
      }
    }
  }, []);

  return (
    <>
      <div
        className={"Loader " + Position}
        style={{ background: overlaycolor }}
      >
        <CircleLoader color={color} size={size} />
      </div>
    </>
  );
}

export default Loader;
