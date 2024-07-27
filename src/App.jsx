import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
// import NotFound from './pages/NotFound';
import BaseLayout from './Layout/BaseLayout';
import Dashboard from "./pages/dashboard";
// import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import VerifyEmail from "./pages/VerifyEmail";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <BaseLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={ <Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email/:shortId" element={<VerifyEmail />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
        } />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  )
)
function App() {
  return <RouterProvider router={router} />
}

export default App;