import { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AddCustomer from "../components/AddCustomers";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

const Customers = () => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  function toggleShow() {
    setShow(!show);
  }
  useEffect(() => {
    const url = baseUrl + "api/customers";
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        
        if (response.status === 401) {
          setLoggedIn(false)
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        
        return response.json();
      })
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);

  function newCustomer(name, industry) {
    const data = { name: name, industry: industry };
    const url = baseUrl + "api/customers";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        toggleShow();
        console.log(data);
        setCustomers([...customers, data.customer]);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      <h2>Here are our customers</h2>
      <ul>
        {customers
          ? customers.map((customer) => {
              return (
                <li key={customer.id}>
                  <Link to={"/customer/" + customer.id}>{customer.name}</Link>
                </li>
              );
            })
          : null}
      </ul>
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </div>
  );
};

export default Customers;
