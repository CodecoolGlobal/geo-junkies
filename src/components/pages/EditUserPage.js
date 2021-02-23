import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";
import APIs from "../files/ApiRequestURL.json";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../../style/Forms.css";

const EditUserPageDiv = styled.div`
  text-align: center;
`;

export default function EditUserPage() {
  return (
    <EditUserPageDiv>
      <p>Edit user page</p>
    </EditUserPageDiv>
  );
}
