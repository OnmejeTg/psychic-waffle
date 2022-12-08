import { data } from "autoprefixer";
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Contactlist = () => {
  const [complaints, setComplaint] = React.useState();

  useEffect(() => {
    fetch("http://localhost:8000/api/contactus/complaint-list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setComplaint(data);
      });
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-3">All complaints</h2>
      </div>
      <table className="border-separate border-spacing-2 border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 ...">Date</th>
            <th className="border border-slate-600 ...">Name</th>
            <th className="border border-slate-600 ...">Subject</th>
          </tr>
        </thead>
        <tbody>
          {complaints
            ? complaints.map((complaint) => {
                return (
                  <tr key={complaint.id}>
                    <td className="border border-slate-700 ...">
                      {complaint.created_at}
                    </td>
                    <td className="border border-slate-700 ...">
                    {complaint.name}
                    </td>
                    <td className="border border-slate-700 ...">{complaint.subject}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </>
  );
};
export default Contactlist;
