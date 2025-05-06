
import { useState } from "react";
import "../styles/universitySystem.css";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import UniversityDetails from "@/components/UniversityDetails";
import UniversityData from "@/components/UniversityData";

const Index = () => {
  const [activeView, setActiveView] = useState("universityDetails");
  const [username] = useState("User0");
  const { toast } = useToast();

  // Sample university data with state management
  const [universities, setUniversities] = useState([
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

  const handleEditUniversity = (id: number) => {
    toast({
      title: "Editing University",
      description: `Opening edit form for University ID: ${id}`,
    });
    console.log(`Editing university with ID: ${id}`);
    // In a real application, you would show an edit form or navigate to edit page
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

  const handleCreateNewUniversity = () => {
    toast({
      title: "Create University",
      description: "Opening new university form",
    });
    console.log("Creating new university");
    // In a real application, you would show a form or navigate to create page
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
            onCreateNewUniversity={handleCreateNewUniversity}
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
