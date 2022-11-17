import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

const Customer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [notFound, setNotFound] = useState();

  useEffect(() => {
    const url = baseUrl + "api/customer/" + id;
    fetch(url)
      .then((response) => {
        if (response.status === 404) {
          setNotFound(true);
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
      });
  }, []);

  return (
    <div>
      {notFound ? <p>No customer with id {id}</p> : null}
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : null}
      <button
        onClick={(e) => {
          const url = baseUrl + "api/customer/" + id;
          fetch(url, { method: "DELETE", headers:{
            'Content-type':'application/json'
          } })
            .then((response) => { 
              if (!response.ok) {
                throw new Error("Something went wrong");
              }
              navigate('/customers')
            })
            .catch((e) => {
              console.log(e);
            });
        }}
      >
        Delete
      </button>
      <br></br>
      <Link to="/customers">Go back</Link>
    </div>
  );
};

export default Customer;
