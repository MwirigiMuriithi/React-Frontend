import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Navbar from './components/global/navbar/Navbar';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import NotFound from './pages/NotFound';
import BaseLayout from './Layout/BaseLayout';

function App() {
  const { user } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App;