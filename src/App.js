import "./App.css";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
  const[role, setRole] = useState('Dev')
  return (
    <>
    <input type="text" onChange={(e)=>{setRole(e.target.value)}} />
      <Employee name="Joe" role="Intern" />
      <Employee name="Peter" role={role}/>
    </>
  );
}

export default App;
