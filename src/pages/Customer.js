import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { baseUrl } from "../shared";
import { LoginContext } from "../App";

const Customer = () => {

  const [loggedIn, setLoggedIn] = useContext(LoginContext)

  const navigate = useNavigate();
  const { id } = useParams();

  const location = useLocation();

  const [customer, setCustomer] = useState();
  const [tempCustomer, setTempCustomer] = useState();
  const [notFound, setNotFound] = useState();
  const [changed, setchanged] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (!customer) return;
    if (!customer) return;

    let equal = true;
    if (customer.name !== tempCustomer.name) equal = false;
    if (customer.industry !== tempCustomer.industry) equal = false;

    if (equal) setchanged(false);
  });

  useEffect(() => {
    const url = baseUrl + "api/customer/" + id;
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
    })
      .then((response) => {
        if (response.status === 404) {
          setLoggedIn(false)
          setNotFound(true);
        }
        if (response.status === 401) {
          setLoggedIn(false)
          navigate("/login", {
            state: {
              previousUrl: location.pathname,
            },
          });
        }
        if (!response.ok) {
          throw new Error("Something went wrong, try again later");
        }
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setTempCustomer(data.customer);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);

  function updateCustomer(e) {
    e.preventDefault();
    const url = baseUrl + "api/customer/" + id;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      body: JSON.stringify(tempCustomer),
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
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then((data) => {
        setCustomer(data.customer);
        setchanged(false);
        setError(undefined);
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  return (
    <div>
      {notFound ? <p>No customer with id {id}</p> : null}
      {customer ? (
        <div>
          <form
            id="customer"
            onSubmit={updateCustomer}
            className="w-full max-w-sm"
          >
            <b>
              <p className="m-2 block ">ID: {tempCustomer.id}</p>
            </b>
            <div className="flex items-center border-b border-purple-600 py-2">
              <input
                id="name"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                value={tempCustomer.name}
                onChange={(e) => {
                  setchanged(true);
                  setTempCustomer({ ...tempCustomer, name: e.target.value });
                }}
              />
            </div>
            <div className="flex items-center border-b border-purple-600 py-2">
              <input
                id="industry"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                value={tempCustomer.industry}
                onChange={(e) => {
                  setchanged(true);
                  setTempCustomer({
                    ...tempCustomer,
                    industry: e.target.value,
                  });
                }}
              />
            </div>
          </form>
          {changed ? (
            <>
              <button
                className="px-4 py-1 bg-slate-600 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-slate-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
                onClick={() => {
                  setTempCustomer({ ...customer });
                  setchanged(false);
                }}
              >
                Cancel
              </button>{" "}
              <button
                form="customer"
                className="mt-3 px-4 py-1 bg-purple-400 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >
                Save
              </button>
            </>
          ) : null}
          <div>
            <button
              className="mt-3 px-4 py-1 bg-slate-700 text-sm text-white font-semibold rounded-full border border-slate-200 hover:text-white hover:bg-slate-800 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              onClick={(e) => {
                const url = baseUrl + "api/customer/" + id;
                fetch(url, {
                  method: "DELETE",
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
                    if (!response.ok) {
                      throw new Error("Something went wrong");
                    }
                    setError(undefined);
                    navigate("/customers");
                  })
                  .catch((e) => {
                    setError(e.message);
                  });
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ) : null}
      {error ? <p>{error}</p> : null}
      <br />
      <Link to="/customers">
        <button className=" no-underline px-4 py-1 bg-purple-400 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
          Go back
        </button>
      </Link>
    </div>
  );
};

export default Customer;
