import "./index.css";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import NotFound from "./components/NotFound";
import Customer from "./pages/Customer";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customers/:id" element={<Customer/>} />
          <Route path="/dictionary" element={<Dictionary/>} />
          <Route path="/404" element={<NotFound/>} />
          <Route path="/dictionary/:search" element={<Definition/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
