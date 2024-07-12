import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:8000/auth/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        if (!response.ok) {
            setLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // Update the auth context
            dispatch({ type: 'LOGIN', payload: json });

            setLoading(false);
        }
    };

    return { login, isLoading, error };
};
