import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>
            <Link to="/" className="logo">Git-first RMS</Link>
          </h1>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            <Link to="/new">Create</Link>
            <Link to="/metrics">Metrics</Link>
          </nav>
        </div>
      </header>
      
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
