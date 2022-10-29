function Employee(props) {
    
  return (
    <div>
      <h3>Employee: {props.name}</h3>
      {/* <p>{props.role ? props.role : "No Role"}</p> */}
      {props.role ? <p>{props.role}</p> : <p>No Role</p>}
    </div>
  );
}

export default Employee;
