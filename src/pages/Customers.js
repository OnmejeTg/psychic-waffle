import { useState, useEffect } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    console.log("fetching...");
    fetch("http://127.0.0.1:8000/api/customers")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCustomers(data.customers);
      });
  }, []);
  return (
    <div>
      <h2>Hera are our customers</h2>
      {customers? customers.map((customer)=>{
        return(
          <p>{customer.name}</p>
        )
      }):null}
    </div>
  );
};

export default Customers;
