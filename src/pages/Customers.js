import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared";

const Customers = () => {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    const url = baseUrl + "api/customers";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);
  return (
    <div>
      <h2>Hera are our customers</h2>
      <ul>
      {customers
        ? customers.map((customer) => {
            return (
              <li key={customer.id}>
                <Link to={"/customers/" + customer.id}>{customer.name}</Link>
              </li>
            );
          })
        : null}
        </ul>
    </div>
  );
};

export default Customers;
