import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/TodolistG4",
  headers: {
    "Content-type": "application/json"
  }
});