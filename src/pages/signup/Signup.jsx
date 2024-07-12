import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { signup, error, isLoading } = useSignup();
    const navigate = useNavigate();

    // State variables for error messages
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset previous error messages
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');

        // Check for errors in input fields
        let isValid = true;

        // Username validation
        if (username.trim() === '') {
            setUsernameError('Username is required.');
            isValid = false;
        } else if (username.length < 4) {
            setUsernameError('Username must be at least 4 characters long.');
            isValid = false;
        } else if (username.length > 24) {
            setUsernameError('Username must not exceed 24 characters.');
            isValid = false;
        }

        // Password validation
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            isValid = false;
        } else if (password.length > 24) {
            setPasswordError('Password must not exceed 24 characters.');
            isValid = false;
        }
        if (!password.match(/[a-z]/)) {
            setPasswordError('Password must contain at least one lowercase letter.');
            isValid = false;
        }
        if (!password.match(/[A-Z]/)) {
            setPasswordError('Password must contain at least one uppercase letter.');
            isValid = false;
        }
        if (!password.match(/[0-9]/)) {
            setPasswordError('Password must contain at least one digit.');
            isValid = false;
        }
        if (!password.match(/[!@#$%^&*]/)) {
            setPasswordError('Password must contain at least one special character (!@#$%^&*).');
            isValid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            isValid = false;
        }

        // If no errors, attempt signup
        if (isValid) {
            const success = await signup(username, password);
            if (success) {
                // Navigate to the sales page upon successful signup
                navigate('/sales');
            }
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Join Us!</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {usernameError && <div className="error">{usernameError}</div>}
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                    {error && <div className="error">Error: {error}</div>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
