// File: EditModal.js
//Edit functionality is added as got suggestion in last feedback.
import React, { useState } from "react";

const EditModal = ({ user, handleUpdateUser, handleClose }) => {
  const [editedData, setEditedData] = useState({
    name: user.name,
    email: user.email,
    role: user.role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    handleUpdateUser(user.id, editedData);
    handleClose();
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h2>Edit User</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={editedData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={editedData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={editedData.role}
            onChange={handleChange}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
