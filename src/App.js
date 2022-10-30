import "./index.css";
import Employee from "./components/Employee";

function App() {

  return (
    <div className="">
      
      <div className="flex flex-wrap justify-center">
        <Employee name="Joe" role="Intern" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="Alice" role="Dev" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="Tonia" role="HR" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="Fred" role="Manager" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="George" role="Dev" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="Victor" role="Intern" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="Prince" role="Intern" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        <Employee name="Sam" role="Admin" img="https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg"/>
        
        
      </div>
    </div>
  );
}

export default App;
