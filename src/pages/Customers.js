import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Customers = () => {
  const [customers, setCustomers] = useState();
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers);
      });
  }, []);
  return (
    <div>
      <h2>Hera are our customers</h2>
      {customers? customers.map((customer)=>{
        return(
          <p><Link to={'/customers/'+customer.id}>{customer.name}</Link></p>
        )
      }):null}
    </div>
  );
};

export default Customers;
