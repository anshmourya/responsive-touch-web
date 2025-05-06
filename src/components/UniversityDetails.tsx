
import React from "react";
import { useToast } from "@/hooks/use-toast";

interface University {
  id: number;
  state: string;
  name: string;
  phone: string;
}

interface UniversityDetailsProps {
  universities: University[];
  onDeleteUniversity: (id: number) => void;
  onEditUniversity: (id: number) => void;
  onDeleteUniversityDetail: () => void;
  onCreateNewUniversity: () => void;
  onExportToExcel: () => void;
}

const UniversityDetails: React.FC<UniversityDetailsProps> = ({ 
  universities, 
  onDeleteUniversity, 
  onEditUniversity,
  onDeleteUniversityDetail,
  onCreateNewUniversity,
  onExportToExcel
}) => {
  const { toast } = useToast();

  return (
    <section className="university-details">
      <div className="section-header">
        <h2>University Details</h2>
        <div className="action-buttons">
          <button 
            className="btn btn-danger" 
            onClick={onDeleteUniversityDetail}
          >
            Delete University Detail
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onCreateNewUniversity}
          >
            Create new university
          </button>
          <button 
            className="btn btn-danger" 
            onClick={onExportToExcel}
          >
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
                    onClick={() => onEditUniversity(university.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete" 
                    onClick={() => onDeleteUniversity(university.id)}
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
                  <button 
                    className="btn btn-edit"
                    onClick={() => toast({ title: "Empty Row", description: "This is a placeholder row" })}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-delete"
                    onClick={() => toast({ title: "Empty Row", description: "This is a placeholder row" })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UniversityDetails;
