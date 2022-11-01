import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Caleb",
      role: "Developer",
      img: "https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg",
    },
    {
      id: 2,
      name: "Tonia",
      role: "Intern",
      img: "https://images.pexels.com/photos/3290236/pexels-photo-3290236.jpeg",
    },
    {
      id: 3,
      name: "George",
      role: "Product Manager",
      img: "https://images.pexels.com/photos/5490239/pexels-photo-5490239.jpeg",
    },
    {
      id: 4,
      name: "Alison",
      role: "HR",
      img: "https://images.pexels.com/photos/3848184/pexels-photo-3848184.jpeg",
    },
    {
      id: 5,
      name: "Rex",
      role: "Designer",
      img: "https://images.pexels.com/photos/2880094/pexels-photo-2880094.jpeg",
    },
    {
      id: 6,
      name: "Sai",
      role: "Admin",
      img: "https://images.pexels.com/photos/1927306/pexels-photo-1927306.jpeg",
    },
  ]);

  function updateEmployee(id, newName, newRole) {
    const unpdatedEmployee = employees.map((employee) => {
      if (id === employee.id) {
        return { ...employee, name: newName, role: newRole };
      }
      return employee;
    });
    setEmployees(unpdatedEmployee);
  }

  return (
    <div className="">
      <div className="flex flex-wrap justify-center">
        {employees.map((employee) => {
          return (
            <Employee
              key={employee.id}
              id={employee.id}
              name={employee.name}
              role={employee.role}
              img={employee.img}
              updateEmployee={updateEmployee}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
