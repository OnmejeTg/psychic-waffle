import "./index.css";
import { createContext, useState } from "react";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList";
import Login from "./pages/login";
import { useEffect } from "react";
import { baseUrl } from "./shared";
import Register from "./pages/Register";

export const LoginContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage ? true : false);

  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = baseUrl + "api/token/refresh/";
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access = data.access;
            localStorage.refresh = data.refresh;
            setLoggedIn(true);
          });
      }
    }
    refreshTokens();
    const minutes = 1000 * 60;
    setInterval(refreshTokens, minutes * 3);
  });

  function changedLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changedLoggedIn]}>
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/customer/:id" element={<Customer />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Header>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
