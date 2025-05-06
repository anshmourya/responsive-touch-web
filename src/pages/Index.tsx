
import { useState } from "react";
import "../styles/universitySystem.css";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import UniversityDetails from "@/components/UniversityDetails";
import UniversityData from "@/components/UniversityData";

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

const Index = () => {
  const [activeView, setActiveView] = useState("universityDetails");
  const [username] = useState("User0");
  const { toast } = useToast();

  // Sample university data with state management
  const [universities, setUniversities] = useState<University[]>([
    {
      id: 1,
      state: "Andhra Pradesh",
      name: "Andhra University",
      phone: "+91-9876543210",
      email: "info@andhrauni.edu",
      address: "Visakhapatnam, Andhra Pradesh",
      fees: "₹50,000",
      headName: "Dr. P. V. G. D. Prasad Reddy",
      inFavourOf: "Registrar, Andhra University",
    },
    {
      id: 2,
      state: "Uttar Pradesh",
      name: "Uttar Pradesh University",
      phone: "+91-9876543211",
      email: "info@upuni.edu",
      address: "Lucknow, Uttar Pradesh",
      fees: "₹45,000",
      headName: "Dr. R.K. Singh",
      inFavourOf: "Registrar, UP University",
    },
  ]);

  // Sample program data
  const programs = Array(15).fill(null).map((_, index) => ({
    id: index + 1,
    name: "x-x-x-x-x-x-x-x",
    totalStudents: "x-x-x-x",
    ddConfirmation: "x-x-x-x-x-",
    pending: "x-x-x-x"
  }));

  const handleDeleteUniversity = (id: number) => {
    // Filter out the university with the given ID
    const updatedUniversities = universities.filter(univ => univ.id !== id);
    setUniversities(updatedUniversities);
    
    toast({
      title: "University Deleted",
      description: `University ID: ${id} has been removed`,
    });
  };

  const handleEditUniversity = (updatedUniversity: University) => {
    const updatedUniversities = universities.map(univ => 
      univ.id === updatedUniversity.id ? updatedUniversity : univ
    );
    
    setUniversities(updatedUniversities);
    
    toast({
      title: "University Updated",
      description: `University ID: ${updatedUniversity.id} has been updated`,
    });
  };

  const handleCreateUniversity = (newUniversity: Omit<University, "id">) => {
    // Generate a new ID (in a real app, this would be handled by the backend)
    const newId = Math.max(...universities.map(u => u.id), 0) + 1;
    
    const universityToAdd = {
      ...newUniversity,
      id: newId
    };
    
    setUniversities([...universities, universityToAdd]);
    
    toast({
      title: "University Created",
      description: `New university "${newUniversity.name}" has been created`,
    });
  };

  const handleViewChange = (view: string) => {
    setActiveView(view);
    toast({
      title: "View Changed",
      description: `Switched to ${view === "universityData" ? "University Data" : "University Details"} view`,
    });
  };

  const handleExportToExcel = () => {
    toast({
      title: "Exporting Data",
      description: "Starting export to Excel...",
    });
    console.log("Exporting to Excel");
    // In a real application, you would generate an Excel file here
  };

  const handleDeleteUniversityDetail = () => {
    toast({
      title: "Delete University Detail",
      description: "Please select universities to delete",
    });
    console.log("Delete University Detail clicked");
  };

  const handleLogout = () => {
    toast({
      title: "Logging Out",
      description: "You have been logged out",
    });
    console.log("Logging out");
    // In a real application, you would handle logout logic here
  };

  return (
    <div className="university-system">
      {/* Header/Navigation */}
      <Header 
        activeView={activeView} 
        username={username}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* University Details View */}
        {activeView === "universityDetails" && (
          <UniversityDetails 
            universities={universities}
            onDeleteUniversity={handleDeleteUniversity}
            onEditUniversity={handleEditUniversity}
            onDeleteUniversityDetail={handleDeleteUniversityDetail}
            onCreateNewUniversity={handleCreateUniversity}
            onExportToExcel={handleExportToExcel}
          />
        )}

        {/* University Data View */}
        {activeView === "universityData" && (
          <UniversityData programs={programs} />
        )}
      </main>
    </div>
  );
};

export default Index;
