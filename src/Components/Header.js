import React from "react";

const Header = () => {
  return (
    <div style={{position: 'fixed', width: '100%'}} >
      <nav className="navbar bg-primary">
        <div className="container-fluid">
          <a
            className="navbar-brand"
            href="#"
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
          </a>
          <h4 className="text-light">The Chatrr Web App</h4>
        </div>
      </nav>
    </div>
  );
};

export default Header;
