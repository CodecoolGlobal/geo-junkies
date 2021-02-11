import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import UsePostData from "../../hooks/UsePostData";
import styled from "styled-components";
import APIs from "../files/ApiRequestURL.json";
import "../../style/Forms.css";

const RegistrationPageDiv = styled.div`
  text-align: center;
`;

const RegistrationPage = (props) => {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState([]);
  const user = useContext(UserContext)[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      name: event.target.elements.username.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      confirm_password: event.target.elements.password_confirm.value,
    };
    UsePostData(APIs.registration, user.token, userObject, (response) => {
      setErrorMessage([]);
      if (response.status === 201) {
        return history.push("/login");
      }
      Object.entries(response).forEach(([k, v]) => {
        v.forEach((value) => {
          setErrorMessage((old) => [...old, value]);
        });
      });
    });
  };

  return (
    <RegistrationPageDiv>
      <div id="content_div">
        <form method="post" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <label>Username:</label>
          <input type="text" name="username" required autoComplete="off" />
          <label>Email:</label>
          <input type="email" name="email" required />
          <label>Password:</label>
          <input type="password" name="password" required />
          <label>Confirm password:</label>
          <input type="password" name="password_confirm" required />
          <button type="submit">Register</button>
        </form>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => (
              <div id="error_msg" key={index}>
                {data}
              </div>
            ))}
      </div>
    </RegistrationPageDiv>
  );
};

export default RegistrationPage;
