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
      {customers
        ? customers.map((customer) => {
            return (
              <p>
                <Link to={"/customers/" + customer.id}>{customer.name}</Link>
              </p>
            );
          })
        : null}
    </div>
  );
};

export default Customers;
