import "./index.css";
import Employee from "./components/Employee";
import { useState } from "react";
import {v4 as uuidv4} from 'uuid'

function App() {
  const [employees, setEmployees] = useState([
    {
      name: "Caleb",
      role: "Developer",
      img: "https://images.pexels.com/photos/4355346/pexels-photo-4355346.jpeg",
    },
    {
      name: "Tonia",
      role: "Intern",
      img: "https://images.pexels.com/photos/3290236/pexels-photo-3290236.jpeg",
    },
    {
      name: "George",
      role: "Product Manager",
      img: "https://images.pexels.com/photos/5490239/pexels-photo-5490239.jpeg",
    },
    {
      name: "Alison",
      role: "HR",
      img: "https://images.pexels.com/photos/3848184/pexels-photo-3848184.jpeg",
    },
    {
      name: "Rex",
      role: "Designer",
      img: "https://images.pexels.com/photos/2880094/pexels-photo-2880094.jpeg",
    },
    {
      name: "Sai",
      role: "Admin",
      img: "https://images.pexels.com/photos/1927306/pexels-photo-1927306.jpeg",
    },
  ]);
  return (
    <div className="">
      <div className="flex flex-wrap justify-center">
        {employees.map((employee) => {
          return (
            <Employee
              key={uuidv4()}
              name={employee.name}
              role={employee.role}
              img={employee.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
