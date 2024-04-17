import React from "react";
import UserProfile from "./UserProfile";
import { useUser } from "../Contexts/UserModelContext";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

const Header = () => {
  const [open, setOpen] = useUser();
  const data = localStorage.getItem("user");
  const user = JSON.parse(data);
  return (
    <div style={{ position: "fixed", width: "100%" }}>
      <nav className="navbar bg-primary">
        <div className="container-fluid" style={{alignItems: 'center'}} >
      {/* <Menu /> */}
          <Link
            className="navbar-brand"
            to="/"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              color: "white",
            }}
          >
            
            <img
              src="./Icon.png"
              alt="Logo"
              width={50}
              height={50}
              style={{ borderRadius: 50 }}
              className="d-inline-block align-text-top"
            />
            Chatrr
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
