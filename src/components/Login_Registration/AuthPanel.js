import React, { useState } from "react";
import { useEffect, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import Login from "./Login";
import axios from "axios";
import fire from "../../fire";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../App";

function AuthPanel() {
  const { user, setUser } = useContext(ThemeContext);
  let navigate = useNavigate();

  //Deconstruct prop
  const auth = getAuth();

  const [userName, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //For error handling:
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  //Help to switch from signin to signup
  const [hasAccount, setHasAccount] = useState(true);

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };

  const clearError = () => {
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
  };

  //First function for Login:
  const handleLogin = () => {
    console.log("Logging User!");
    clearError();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);

        // //Store in localStorage that user is currently logged in:
        localStorage.setItem("token", "true");
        // localStorage.setItem('userEmail', user.email)
        // localStorage.setItem('userName', user.displayName)
        // localStorage.setItem('uid', user.uid)
        // window.location.href="/notes"
        navigate("/notes");
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/user-disabled":
            setEmailError(err.message);
            break;
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  };

  //TODO
  // Create connection to our localhost:8080/user POST
  // will use AXIOS (can also use fetch)
  const handleSignup = () => {
    console.log("In Signup handler");
    clearError();

    if (userName == "") {
      setUsernameError("Username cannot be empty");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User created: " + userCredential);
          const user = userCredential.user;

          //Set DisplayName:
          updateProfile(user, {
            displayName: userName,
          })
            .then((success) => {
              console.log("Succesfully updated user profile for displayName!");
              setUser(userCredential.user);
            })
            .catch((err) => {
              console.log("Error when updating displayName: " + err);
            });

          // If succseful, we save our user information to our mongoDB database by way of our express server
          // for now we'll use the url: localhost:8080/user
          axios
            .post(`http://localhost:8080/user`, {
              userName: userName,
              Email: email,
              password: password,
              userUID: userCredential.user.uid,
            })
            .then((response) => {
              console.log("Succesfully saved: " + response);
              //If user is succesfully saved, then we tell users to login:
              setHasAccount(false);

              localStorage.setItem("token", "true");
              navigate("/");
            })
            .catch((error) => {
              console.log("Error " + error);
            });
        })
        .catch((err) => {
          console.log(err);
          switch (err.code) {
            case "auth/email-already-in-use":
              setEmailError(err.message);
              break;
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/missing-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
          }
        });
    }
  };

  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  return (
    <div>
      <Login
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        setUsername={setUsername}
        userName={userName}
        userNameError={usernameError}
      />
    </div>
  );
}

export default AuthPanel;
