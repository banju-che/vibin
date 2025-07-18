import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './pages/LoginPage';
import Home from './pages/HomePage';
import MyProfile from "./pages/MyProfile";
import UserProfile from "./pages/UserProfile";
import VideoFeed from './pages/VideoFeed';
import UploadVideo from "./pages/UploadVideo";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/profile/me"
          element={
            <MainLayout>
              <MyProfile />
            </MainLayout>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <MainLayout>
              <UserProfile />
            </MainLayout>
          }
        />
        <Route
          path="/loopsta"
          element={
            <MainLayout>
              <VideoFeed />
            </MainLayout>
          }
        />
        <Route
          path="/upload"
          element={
            <MainLayout>
              <UploadVideo />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
