import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Dropdown.css";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
function Dropdown({ setCategory }) {
  const [dropboxOption, setdropboxOption] = useState([]);

  useEffect(() => {
    console.log("Calling our express server for user notes!");

    getAPI();
    console.log(dropboxOption);
  }, []);

  useEffect(() => {
    console.log("Calling our useEffect for dropboxOption!");
    console.log(dropboxOption);
  }, [dropboxOption]);

  const clickHandler = (event) => {
    console.log(event);
    if (setCategory) {
      setCategory(event.label);
    }
  };

  const getAPI = async () => {
    let addArray = [];
    try {
      const userUID = localStorage.getItem("uid");
      console.log("Inside our GET Request function!");
      return fetch(`http://localhost:8080/categories`)
        .then((res) => res.json())
        .then((json) => {
          console.log("Received Json message: ");
          console.log(json.message);
          //   setFetchedData(json.message);
          json.message.map((data) => {
            console.log("THIS WORKS! " + data.categoryType);
            let newArray = {
              label: data.categoryType,
              value: data.categoryType,
            };
            console.log(newArray);
            addArray = [...addArray, newArray];
            // setdropboxOption(addArray);
            console.log(addArray);
          });
          setdropboxOption(addArray);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dropbox">
      <Select options={dropboxOption} onChange={clickHandler} />
    </div>
  );
}

export default Dropdown;
