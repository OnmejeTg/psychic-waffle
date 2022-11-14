import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Customer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/customer/" + id;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);

  return (
    <div>
      {customer ? 
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
       : null}
       <Link to='/customers'>Go back</Link>
    </div>
  );
};

export default Customer;
