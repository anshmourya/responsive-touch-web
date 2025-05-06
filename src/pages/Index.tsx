
import { useState } from "react";
import "../styles/universitySystem.css";

const Index = () => {
  const [activeView, setActiveView] = useState("universityDetails");
  const [username] = useState("User0");

  // Sample university data
  const universities = [
    {
      id: 1,
      state: "Andhra Pradesh",
      name: "Andhra University",
      phone: "+91-x-x-x-x-x",
    },
    {
      id: 2,
      state: "Uttar Pradesh",
      name: "Uttar Pradesh University",
      phone: "+91-x-x-x-x-x",
    },
  ];

  // Sample program data
  const programs = Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    name: "x-x-x-x-x-x-x-x",
    totalStudents: "x-x-x-x",
    ddConfirmation: "x-x-x-x-x-",
    pending: "x-x-x-x"
  }));

  const handleDeleteUniversity = (id: number) => {
    console.log(`Deleting university with ID: ${id}`);
    // In a real application, you would update state or call an API here
  };

  const handleEditUniversity = (id: number) => {
    console.log(`Editing university with ID: ${id}`);
    // In a real application, you would show an edit form or navigate to edit page
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const handleExportToExcel = () => {
    console.log("Exporting to Excel");
    // In a real application, you would generate an Excel file here
  };

  const handleCreateNewUniversity = () => {
    console.log("Creating new university");
    // In a real application, you would show a form or navigate to create page
  };

  const handleLogout = () => {
    console.log("Logging out");
    // In a real application, you would handle logout logic here
  };

  return (
    <div className="university-system">
      {/* Header/Navigation */}
      <header className="header">
        <div className="logo">ESection</div>
        <nav className="main-nav">
          <ul>
            <li><a href="#" className="nav-link">Home</a></li>
            <li className="dropdown">
              <a href="#" className="nav-link">Forms ▾</a>
            </li>
            <li className="dropdown">
              <a href="#" className="nav-link">View ▾</a>
            </li>
            <li>
              <a 
                href="#" 
                className={`nav-link ${activeView === "universityData" ? "active" : ""}`}
                onClick={() => handleViewChange("universityData")}
              >
                University Data
              </a>
            </li>
          </ul>
        </nav>
        <div className="user-controls">
          <button className="user-btn">
            <span className="user-icon">👤</span> {username}
          </button>
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* University Details View */}
        {activeView === "universityDetails" && (
          <section className="university-details">
            <div className="section-header">
              <h2>University Details</h2>
              <div className="action-buttons">
                <button className="btn btn-danger" onClick={() => console.log("Delete University Detail")}>
                  Delete University Detail
                </button>
                <button className="btn btn-primary" onClick={handleCreateNewUniversity}>
                  Create new university
                </button>
                <button className="btn btn-danger" onClick={handleExportToExcel}>
                  Export to Excel
                </button>
              </div>
            </div>
            
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>State</th>
                    <th>University Name</th>
                    <th>Blank 1</th>
                    <th>Phone</th>
                    <th>Blank 2</th>
                    <th>Blank 3</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {universities.map((university) => (
                    <tr key={university.id}>
                      <td>{university.id}.</td>
                      <td>{university.state}</td>
                      <td>{university.name}</td>
                      <td>-------</td>
                      <td>{university.phone}</td>
                      <td>-------</td>
                      <td>-------</td>
                      <td className="action-cell">
                        <button 
                          className="btn btn-edit" 
                          onClick={() => handleEditUniversity(university.id)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-delete" 
                          onClick={() => handleDeleteUniversity(university.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* Empty rows */}
                  {Array(10).fill(null).map((_, index) => (
                    <tr key={`empty-${index}`}>
                      <td>-</td>
                      <td>----</td>
                      <td>---------------</td>
                      <td>--------</td>
                      <td>----------</td>
                      <td>------</td>
                      <td>--------</td>
                      <td className="action-cell">
                        <button className="btn btn-edit">Edit</button>
                        <button className="btn btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* University Data View */}
        {activeView === "universityData" && (
          <section className="university-data">
            <div className="section-header">
              <h2>Program Details</h2>
            </div>
            
            <div className="table-container">
              <table className="data-table program-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Program name</th>
                    <th>Total student</th>
                    <th>DD Confirmation</th>
                    <th>Pending</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program, index) => (
                    <tr key={program.id} className={index % 2 === 0 ? "" : "alt-row"}>
                      <td>x</td>
                      <td>{program.name}</td>
                      <td>{program.totalStudents}</td>
                      <td>{program.ddConfirmation}</td>
                      <td>{program.pending}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
