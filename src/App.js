// File: app.js
import React, { useState, useEffect } from "react";
import "./styles.css";
import Pagination from "./pagination";
import { fetchDataFromApi } from "./API";
import EditModal from "./EditModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const items_in_pages = 10;

const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchDataFromApi()
      .then((data) => {
        setUsersData(data);
      })
      .catch((error) => {
        console.error("Failed to fetch data: ", error);
      });
  }, []);

  useEffect(() => {
    const filteredUsers = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredUsers);
    setCurrentPage(1);
  }, [usersData, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDelete = (id) => {
    // Filter out the user with the given ID from filteredData
    const updatedData = filteredData.filter((user) => user.id !== id);
    setFilteredData(updatedData);
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleSelectAllRows = (e) => {
    if (e.target.checked) {
      const allRowIds = filteredData
        .slice((currentPage - 1) * items_in_pages, currentPage * items_in_pages)
        .map((user) => user.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    const remainingRows = filteredData.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setFilteredData(remainingRows);
    setSelectedRows([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id) => {
    setShowEditModal(true);
    setEditUserId(id);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditUserId(null);
  };
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);

    // Toggle the 'dark-mode' class on the 'body' element
    const bodyElement = document.querySelector("body");
    bodyElement.classList.toggle("dark-mode");
  };

  const handleUpdateUser = (id, updatedData) => {
    const updatedUsersData = usersData.map((user) =>
      user.id === id ? { ...user, ...updatedData } : user
    );
    setUsersData(updatedUsersData);
    setFilteredData(updatedUsersData);
  };

  const renderRows = () => {
    const startIndex = (currentPage - 1) * items_in_pages;
    const endIndex = currentPage * items_in_pages;
    return filteredData.slice(startIndex, endIndex).map((user) => (
      <tr
        key={user.id}
        className={selectedRows.includes(user.id) ? "selected" : ""}
      >
        <td>
          <input
            type="checkbox"
            checked={selectedRows.includes(user.id)}
            onChange={(e) => handleCheckboxChange(e, user.id)}
          />
        </td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <span className="action-icons">
            <span className="mobile-only">
              <button onClick={() => handleEdit(user.id)}>
                <FontAwesomeIcon icon={faEdit} className="fa" />
              </button>
              <button onClick={() => handleDelete(user.id)}>
                <FontAwesomeIcon icon={faTrashAlt} className="fa" />
              </button>
            </span>

            <span className="desktop-only">
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </span>
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: "70%", borderRadius: "5px" }}
        />
        <button onClick={handleDarkModeToggle} className="darkorlight">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAllRows} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / items_in_pages)}
        onPageChange={handlePageChange}
      />
      <div className="delete-selected-container">
        {selectedRows.length > 0 && (
          <button onClick={handleDeleteSelected}>Delete Selected</button>
        )}
      </div>
      {showEditModal && editUserId && (
        <EditModal
          user={filteredData.find((user) => user.id === editUserId)}
          handleUpdateUser={handleUpdateUser}
          handleClose={handleCloseEditModal}
        />
      )}
    </div>
  );
};

export default App;
