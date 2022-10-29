import "./App.css";
import Employee from "./components/Employee";

function App() {
  const showEmployee = false;
  return <>{showEmployee ? <Employee /> : <p>You Cannot view employee</p>}</>;
}

export default App;
