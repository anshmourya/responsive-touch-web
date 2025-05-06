
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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

interface UniversityFormProps {
  university?: University;
  isOpen: boolean;
  onClose: () => void;
  onSave: (university: Omit<University, "id"> & { id?: number }) => void;
}

const UniversityForm: React.FC<UniversityFormProps> = ({
  university,
  isOpen,
  onClose,
  onSave,
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<Omit<University, "id"> & { id?: number }>({
    state: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    fees: "",
    headName: "",
    inFavourOf: "",
  });

  // Initialize form with university data if editing
  React.useEffect(() => {
    if (university) {
      setFormData({
        id: university.id,
        state: university.state,
        name: university.name,
        phone: university.phone,
        email: university.email || "",
        address: university.address || "",
        fees: university.fees || "",
        headName: university.headName || "",
        inFavourOf: university.inFavourOf || "",
      });
    } else {
      // Reset form when creating a new university
      setFormData({
        state: "",
        name: "",
        phone: "",
        email: "",
        address: "",
        fees: "",
        headName: "",
        inFavourOf: "",
      });
    }
  }, [university, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "University name is required",
      });
      return;
    }
    
    onSave(formData);
    onClose();
    
    // Show success toast
    toast({
      title: university ? "University Updated" : "University Created",
      description: `${formData.name} has been ${university ? "updated" : "created"} successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {university ? "Edit University" : "New University Details"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name of University :</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="University Name"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="address">University Address :</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="University Address"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="state">University State :</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="University State"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="headName">Head Name :</Label>
                <Input
                  id="headName"
                  name="headName"
                  value={formData.headName}
                  onChange={handleChange}
                  placeholder="Head Name"
                />
              </div>
            </div>
            
            {/* Right column */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email ID :</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email ID"
                  type="email"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Mobile No:</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="fees">Fees:</Label>
                <Input
                  id="fees"
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  placeholder="Fees"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="inFavourOf">In favour of:</Label>
                <Input
                  id="inFavourOf"
                  name="inFavourOf"
                  value={formData.inFavourOf}
                  onChange={handleChange}
                  placeholder="In favour of"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600">
              {university ? "Update" : "Add New College Data"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UniversityForm;
