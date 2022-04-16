import React, { useState } from "react";
import axios from "axios";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import styles from "../../styles/Home.module.css";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const AddNewHero = () => {
  const [busy, setBusy] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({
    realName: "",
    superHero: "",
  });

  /// to POST data to db
  const handleForm = async (event) => {
    event.preventDefault();
    setIsError(false);
    setBusy(true);
    if (formData.realName.trim() == "" || formData.superHero.trim() == "") {
      setIsError(true);
      setBusy(false);
      console.log("Form fields should not be empty");
      return;
    }
    try {
      const res = await axios("http://localhost:3000/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(formData),
      });
      console.log(res.data);
      setBusy(false);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  /// if there's any change in input fields, call [handleChange] fn
  const handleChange = (event) => {
    console.log(event);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="container">
      <p className="display-5 p-4">Add New SuperHero Here</p>
      {isError && (
        <Alert variant="outlined" severity="error">
          Form Fields should not be empty
        </Alert>
      )}
      <form className={styles.card} onSubmit={handleForm}>
        <MDBInput
          onChange={handleChange}
          type="text"
          label="SuperHero"
          name="superHero"
        />
        <MDBInput
          onChange={handleChange}
          type="text"
          className="my-3"
          label="RealName"
          name="realName"
        />
        {!busy ? (
          <MDBBtn onClick={handleForm} type="submit">
            Create Hero
          </MDBBtn>
        ) : (
          <CircularProgress color="success" />
        )}
      </form>
    </div>
  );
};

export default AddNewHero;
