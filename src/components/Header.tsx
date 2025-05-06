
import React from "react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  activeView: string;
  username: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, username, onViewChange, onLogout }) => {
  const { toast } = useToast();

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    toast({
      title: "Navigation",
      description: `Navigated to ${label}`,
    });
  };

  return (
    <header className="header">
      <div className="logo">ESection</div>
      <nav className="main-nav">
        <ul>
          <li><a href="#" className="nav-link" onClick={(e) => handleNavLink(e, "Home")}>Home</a></li>
          <li className="dropdown">
            <a href="#" className="nav-link" onClick={(e) => handleNavLink(e, "Forms")}>Forms ▾</a>
          </li>
          <li className="dropdown">
            <a href="#" className="nav-link" onClick={(e) => handleNavLink(e, "View")}>View ▾</a>
          </li>
          <li>
            <a 
              href="#" 
              className={`nav-link ${activeView === "universityData" ? "active" : ""}`}
              onClick={() => onViewChange("universityData")}
            >
              University Data
            </a>
          </li>
        </ul>
      </nav>
      <div className="user-controls">
        <button className="user-btn" onClick={() => toast({ title: "User Profile", description: `Viewing profile for ${username}` })}>
          <span className="user-icon">👤</span> {username}
        </button>
        <button className="logout-btn" onClick={onLogout}>Log out</button>
      </div>
    </header>
  );
};

export default Header;
