
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
  });

  // Initialize form with university data if editing
  React.useEffect(() => {
    if (university) {
      setFormData({
        id: university.id,
        state: university.state,
        name: university.name,
        phone: university.phone,
      });
    } else {
      // Reset form when creating a new university
      setFormData({
        state: "",
        name: "",
        phone: "",
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
    if (!formData.state.trim() || !formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {university ? "Edit University" : "Create New University"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="name">University Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter university name"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {university ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UniversityForm;
