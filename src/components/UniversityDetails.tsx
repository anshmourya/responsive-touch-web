
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UniversityForm from "./UniversityForm";

interface University {
  id: number;
  state: string;
  name: string;
  phone: string;
}

interface UniversityDetailsProps {
  universities: University[];
  onDeleteUniversity: (id: number) => void;
  onEditUniversity: (university: University) => void;
  onDeleteUniversityDetail: () => void;
  onCreateNewUniversity: (university: Omit<University, "id">) => void;
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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUniversity, setCurrentUniversity] = useState<University | undefined>(undefined);

  const handleOpenCreateForm = () => {
    setCurrentUniversity(undefined);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (id: number) => {
    const university = universities.find(u => u.id === id);
    if (university) {
      setCurrentUniversity(university);
      setIsFormOpen(true);
    } else {
      toast({
        title: "Error",
        description: "University not found",
      });
    }
  };

  const handleSaveUniversity = (university: Omit<University, "id"> & { id?: number }) => {
    if (university.id) {
      // Editing existing university
      onEditUniversity({ ...university, id: university.id } as University);
    } else {
      // Creating new university
      onCreateNewUniversity(university);
    }
    setIsFormOpen(false);
  };

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
            onClick={handleOpenCreateForm}
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
                    onClick={() => handleOpenEditForm(university.id)}
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

      {/* University Form Modal */}
      <UniversityForm
        university={currentUniversity}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveUniversity}
      />
    </section>
  );
};

export default UniversityDetails;
