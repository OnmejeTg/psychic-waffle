import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/Header";
import Employees from "./components/Employees";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route path="/e" element={<Employees />} />
        </Routes>
      </BrowserRouter>
    </Header>
  );
}

export default App;
