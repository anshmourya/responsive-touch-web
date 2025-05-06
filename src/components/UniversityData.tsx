
import React from "react";

interface Program {
  id: number;
  name: string;
  totalStudents: string;
  ddConfirmation: string;
  pending: string;
}

interface UniversityDataProps {
  programs: Program[];
}

const UniversityData: React.FC<UniversityDataProps> = ({ programs }) => {
  return (
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
  );
};

export default UniversityData;
