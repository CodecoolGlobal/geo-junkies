import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import UsePostData from "../../hooks/UsePostData";
import APIs from "../files/ApiRequestURL.json";
import "../../style/Forms.css";

const LoginPageDiv = styled.div`
  text-align: center;
`;

const LoginPage = (props) => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    };

    UsePostData(APIs.login, user.token, userObject, (response) => {
      setErrorMessage([]);
      if (response.status === 201) {
        setUser({
          username: response.data.username,
          token: response.data.token,
        });
        return history.push("/");
      }
      console.log(response);
      Object.entries(response).forEach(([k, v]) => {
        v.forEach((value) => {
          setErrorMessage((old) => [...old, value]);
        });
      });
    });
  };

  return (
    <LoginPageDiv>
      <div id="content_div_login">
        <h2>Login</h2>
        <form method="post" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" name="email" />
          <label>Password: </label>
          <input type="text" name="password" />
          <button type="submit">Login</button>
        </form>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => <div key={index}>{data}</div>)}
      </div>
    </LoginPageDiv>
  );
};

export default LoginPage;
