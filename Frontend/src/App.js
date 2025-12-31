import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UserProfile from "./Pages/UserProfile";
import ScienceAndSpacePosts from "./Pages/ScienceSpace";
import Sprituality from "./Pages/Sprituality";
import Search from "./Pages/Search";
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
        <Route path="/google-redirect" element={<GoogleAuthRedirect />} />
        <Route path="/createpost" element={<CreatePost />}></Route>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/science&space" element={<ScienceAndSpacePosts />}></Route>
        <Route path="/spritualcosmos" element={<Sprituality />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Router>
  );
}

export default App;