import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go back to Home</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
  },
  message: {
    fontSize: '1.5rem',
    color: '#666',
    marginBottom: '20px',
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '20px',
  }
};

export default NotFound;
