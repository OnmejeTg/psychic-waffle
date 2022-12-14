import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddEmployee(props) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [img, setImg] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="m-2 block mx-auto px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
      >
        + Add Employee
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setName('')
              setRole('')
              setImg('')
              props.newEmployee(name, role, img);
            }}
            id="editmodal"
            className="w-full max-w-sm"
          >
            <div className="flex items-center border-b border-purple-600 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                id="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                aria-label="name"
              />
            </div>
            <div className="flex items-center border-b border-purple-600 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                id="role"
                value={role}
                placeholder="Enter Role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                aria-label="role"
              />
            </div>
            <div className="flex items-center border-b border-purple-600 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                id="img"
                placeholder="Enter Image Url"
                value={img}
                onChange={(e) => {
                  setImg(e.target.value);
                }}
                aria-label="img url"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            className="px-4 py-1 bg-slate-600 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-slate-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
          >
            Close
          </button>
          <button
            form="editmodal"
            className="px-4 py-1 bg-purple-600 text-sm text-white font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
           onClick={handleClose}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;
