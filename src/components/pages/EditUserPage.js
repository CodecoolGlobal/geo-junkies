import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import APIs from "../files/ApiRequestURL.json";
import UsePostData from "../../hooks/UsePostData";
import "../../style/Forms.css";

const EditUserPageDiv = styled.div`
  text-align: center;
`;

const EditUserPage = (props) => {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObject = {
      username: event.target.elements.username.value,
    };

    UsePostData(APIs.editor, user.token, userObject, (response) => {
      setErrorMessage([]);
      if (response.status === 202) {
        setUser({
          username: response.data.username,
          token: user.token,
        });
        return history.push("/profile");
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
    <EditUserPageDiv>
      <div id="content_div_edit_user">
        <h2>Edit User</h2>
        <form method="post" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="username"
            name="username"
            required
            defaultValue={user.username}
          />
          <button type="submit">Submit</button>
        </form>
        {errorMessage === null
          ? ""
          : errorMessage.map((data, index) => (
              <div id="error_msg" key={index}>
                {data}
              </div>
            ))}
      </div>
    </EditUserPageDiv>
  );
};

export default EditUserPage;
