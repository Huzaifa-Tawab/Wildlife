import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import secureLocalStorage from "react-secure-storage";
import FirebaseInit from "../FireBase/FirebaseAuth";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Loader from "../Components/Loader";

function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [ErrorTitle, setErrorTitle] = useState("");
  //   Functions
  function HandleLogin() {
    setIsLoading(true);
    const auth = getAuth(FirebaseInit);
    signInWithEmailAndPassword(auth, Email, Password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        localStorage.setItem("User", true);
        localStorage.setItem("Details", { user });
        localStorage.setItem("Email", Email);
        localStorage.setItem("Pswd", Password);

        // secureLocalStorage.setItem("User", true);
        // secureLocalStorage.setItem("UserName", user);
        navigate("/Home");
      })
      .catch((error) => {
        setIsLoading(false);
        setisError(true);
        setErrorTitle(error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  return (
    <div className="login">
      <div className="login_ad"></div>
      <div className="login_content">
        <h1 className="login_content-header">Login</h1>
        <div className="login-error-msg">
          {isError ? (
            <Alert
              variant="danger"
              onClose={() => setisError(false)}
              dismissible
            >
              <Alert.Heading>{ErrorTitle}</Alert.Heading>
            </Alert>
          ) : (
            <></>
          )}
        </div>
        <div className="login_content-form">
          <input
            type="email"
            onClick={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            onClick={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <div className="login_content-form-button">
            <button onClick={HandleLogin}>Login</button>
            {IsLoading ? (
              <>
                <Loader
                  overlaycolor="rgba(0, 0, 0, 0.6)"
                  color="#fff"
                  position="abs"
                  size={300}
                />
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
