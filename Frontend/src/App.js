import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import GoogleAuthRedirect from "./Pages/GoogleAuthRedirect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* <Route path="/google-redirect" element={<GoogleAuthRedirect />} /> */}
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;