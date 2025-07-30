
import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
import Home from './pages/Home/home.jsx';
import Login from './pages/Login/login.jsx';
import SignUp from './pages/Signup/Signup.jsx';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';
import UserProfile from './components/Sidebar/Sidebar/profile.jsx';
// import UserProfile from './components/Sidebar/Profile.jsx';

function App() {
    const { authUser } = useAuthContext();

    // Optional: Handle loading state during initial auth check
    if (authUser === undefined) {
        return <div>Loading...</div>;  // Show loading while authUser is being fetched
    }

    return (
        <div className="p-4 h-screen flex items-center justify-center">
            <Routes>
                {/* Home route: Redirect unauthenticated users to Login */}
                <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
                
                {/* Login route: Redirect authenticated users to Home */}
                <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
                
                {/* Signup route: Redirect authenticated users to Home */}
                <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />

                {/* Profile route for any user */}
                <Route path="/profile" element={authUser ? <UserProfile /> : <Navigate to="/login" />} />

                
                {/* Fallback route for undefined paths */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Notification system */}
            <Toaster />
        </div>
    );
}

export default App;
