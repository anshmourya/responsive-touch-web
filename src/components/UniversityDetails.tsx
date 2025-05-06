
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UniversityForm from "./UniversityForm";
import { Button } from "./ui/button";

interface University {
  id: number;
  state: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  fees: string;
  headName: string;
  inFavourOf: string;
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
      onEditUniversity(university as University);
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
              <th>Name</th>
              <th>State</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Head Name</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <tr key={university.id}>
                <td>{university.id}.</td>
                <td>{university.name}</td>
                <td>{university.state}</td>
                <td>{university.address || "---"}</td>
                <td>{university.email || "---"}</td>
                <td>{university.phone}</td>
                <td>{university.headName || "---"}</td>
                <td>{university.fees || "---"}</td>
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
            {universities.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-4">No universities found</td>
              </tr>
            )}
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
