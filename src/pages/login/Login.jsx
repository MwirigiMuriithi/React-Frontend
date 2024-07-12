import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './Login.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password);
    };

    return (
        <div className="login-container">
            <h2>Pick up where you left.</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging In...' : 'Login'}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Login;