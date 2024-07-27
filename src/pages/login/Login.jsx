import { useState } from 'react';
import './Login.css';
// import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { loading, errorMessage } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await login(email, password);
    };

    return (
        <div className="login-container">
            <h2>Pick up where you left.</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" >
                    {/* {loading ? 'Logging In...' : 'Login'} */}
                    Login
                </button>
                {/* {errorMessage && <div className="error">{errorMessage}</div>} */}
            </form>
        </div>
    );
};

export default Login;
