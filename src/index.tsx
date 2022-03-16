import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import _404 from "./Pages/404/404";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Start from "./Pages/Start/Start";

ReactDOM.render(
  <React.StrictMode>
    <link
      href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
      rel="stylesheet"
    />

    <style>{"body { background-color: lightblue; }"}</style>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/start/:time&:difficulty" element={<Start />}></Route>

        <Route path="*" element={<_404 />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
