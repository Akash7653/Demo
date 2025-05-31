import React from "react";
import Signup from "./Signup";
import "./App.css";

const App = () => {
  return (
    <div className="app-background min-vh-100 d-flex flex-column">
      <header className="app-header py-5 text-center text-white">
        <h1 className="display-4 fw-bold gradient-text mb-3">Welcome to BrightLoan</h1>
        <p className="lead fs-5">Fast, reliable & friendly loan approval process.</p>
      </header>

      <main className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="signup-container p-5 rounded shadow-lg bg-white">
          <Signup />
        </div>
      </main>

      <footer className="app-footer text-center text-white py-3">
        <small>&copy; 2025 BrightLoan. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default App;
