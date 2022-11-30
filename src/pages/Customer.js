import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from "../shared";

const Customer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [changed, setchanged] = useState(false);

  useEffect(() => {
    // console.log(changed);
  });

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
        setTempCustomer(data.customer);
      });
  }, []);

  function updateCustomer() {
    const url = baseUrl + "api/customer/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempCustomer),
    })
      .then((response) => {
        return response.json;
      })
      .then((data) => {
        setchanged(false)
        console.log(data);
      })
      .catch();
  }

  return (
    <div>
      {notFound ? <p>No customer with id {id}</p> : null}
      {customer ? (
        <div>
          <p className="m-2 block ">ID: {tempCustomer.id}</p>
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.name}
            onChange={(e) => {
              setchanged(true);
              setTempCustomer({ ...tempCustomer, name: e.target.value });
            }}
          />
          <input
            className="m-2 block px-2"
            type="text"
            value={tempCustomer.industry}
            onChange={(e) => {
              setchanged(true);
              setTempCustomer({ ...tempCustomer, industry: e.target.value });
            }}
          />
          {changed ? (
            <>
              <button
                onClick={() => {
                  setTempCustomer({ ...customer });
                  setchanged(false);
                }}
              >
                Cancel
              </button>{" "}
              <button onClick={updateCustomer}>Save</button>
            </>
          ) : null}
        </div>
      ) : null}
      <button
        onClick={(e) => {
          const url = baseUrl + "api/customer/" + id;
          fetch(url, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Something went wrong");
              }
              navigate("/customers");
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
