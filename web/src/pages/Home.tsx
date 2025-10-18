import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h2>Requirements Management System</h2>
      <div style={{ marginTop: '20px' }}>
        <h3>Quick Actions</h3>
        <ul>
          <li>
            <Link to="/search">Search Requirements</Link>
          </li>
          <li>
            <Link to="/r/BR-0001">View BR-0001</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}