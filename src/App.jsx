import { HashRouter, Routes, Route } from "react-router-dom";
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
    const checkAuthentication = () => {
      try {
        // Try to get from URL params first (for initial login)
        const params = new URLSearchParams(window.location.search);
        const tokenFromURL = params.get('token');
        const userFromURL = params.get('user');
        
        console.log("USER APP: Checking URL params...");
        console.log("Token from URL:", tokenFromURL ? "Present" : "Not found");
        console.log("User from URL:", userFromURL ? "Present" : "Not found");
        
        if (tokenFromURL && userFromURL) {
          try {
            // Decode and parse user data
            const decodedUser = JSON.parse(decodeURIComponent(userFromURL));
            console.log("USER APP: Decoded user:", decodedUser);
            
            // Verify user is not admin (regular user)
            if (decodedUser.role === "admin") {
              console.log("USER APP: User is admin, redirecting to login");
              redirectToLogin();
              return;
            }
            
            // Store in localStorage for future use
            localStorage.setItem("token", decodeURIComponent(tokenFromURL));
            localStorage.setItem("user", JSON.stringify(decodedUser));
            
            // Clean URL to remove sensitive data
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
            
            console.log("USER APP: Authentication successful via URL params");
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          } catch (parseError) {
            console.error("USER APP: Error parsing URL user data:", parseError);
          }
        }
        
        // Regular localStorage check for returning users
        const token = localStorage.getItem("token");
        const userString = localStorage.getItem("user");
        
        console.log("USER APP: Checking localStorage...");
        console.log("Token:", token ? "Present" : "Not found");
        console.log("User string:", userString ? "Present" : "Not found");
        
        if (token && userString) {
          try {
            const user = JSON.parse(userString);
            console.log("USER APP: Parsed user from localStorage:", user);
            
            if (user.role && user.role !== "admin") {
              console.log("USER APP: Authentication successful via localStorage");
              setIsAuthenticated(true);
            } else {
              console.log("USER APP: User is admin or invalid role");
              redirectToLogin();
              return;
            }
          } catch (parseError) {
            console.error("USER APP: Error parsing user data from localStorage:", parseError);
            redirectToLogin();
            return;
          }
        } else {
          console.log("USER APP: No valid authentication found");
          redirectToLogin();
          return;
        }
        
      } catch (error) {
        console.error("USER APP: Authentication check error:", error);
        redirectToLogin();
        return;
      }
      
      setIsLoading(false);
    };
    
    checkAuthentication();
  }, []);
  
  const redirectToLogin = () => {
    // Clear any existing auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    console.log("USER APP: Redirecting to login...");
    window.location.href = "https://mcu-sdars.vercel.app/#/login";
  };
  
  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center bg-gray-900 text-gray-100 justify-center h-screen">
        Loading...
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center bg-gray-900 text-gray-100 justify-center h-screen">
        <div className="text-center">
          <p>Redirecting to login...</p>
        </div>
      </div>
    );
  }
  
  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;
