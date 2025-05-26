import { HashRouter as Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import OverviewPage from "./pages/userdashboard/Overview";
import Sidebar from "./components/common/Sidebar";
import AnalyticsPage from "./pages/userdashboard/AnalyticsPage";
import SettingsPages from "./pages/userdashboard/SettingsPages";
import RecordsPage from "./pages/userdashboard/RecordsPage";
import EditProfile from "./components/settings/EditUserProfile";
import ChangePassword from "./components/settings/EditPassword";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get from URL params first (for initial login)
    const params = new URLSearchParams(window.location.search);
    const tokenFromURL = params.get("token");
    const userFromURL = params.get("user");

    if (tokenFromURL && userFromURL) {
      // Store in localStorage for future use
      localStorage.setItem("token", tokenFromURL);
      localStorage.setItem("user", userFromURL);
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }
    
    // Regular localStorage check for returning users
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("USER APP: Reading token:", token);
    console.log("USER APP: Reading user:", user);
    if (token && user.role === "user") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center  bg-gray-900 text-gray-100 justify-center h-screen">
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    window.location.href = "http://localhost:3000/login";
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* bg1 */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br" />
        <div className="absolute inset-0" />
      </div>

      <Sidebar />
      <Routes>
        <Route index element={<OverviewPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPages />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/settingspage" element={<SettingsPages />} />
      </Routes>
    </div>
  );
}

export default App;
