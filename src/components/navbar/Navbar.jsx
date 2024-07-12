import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <h2>Navbar under development</h2>
      <ul>
        <li><Link to="/" style={{ color: 'blue' }}>Home</Link></li>
        <li><Link to="/login" style={{ color: 'green' }}>Login</Link></li>
        <li><Link to="/signup" style={{ color: 'orange' }}>Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
