import { useState } from "react";
import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

const Security = () => {
  const navigate = useNavigate();  

  const handleChangePasswordClick = () => {
    navigate("/change-password"); 
  };

  return (
    <SettingSection icon={Lock} title={"Account Security"}>
      <div className="mt-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          onClick={handleChangePasswordClick}
        >
          Change Password
        </button>
      </div>
    </SettingSection>
  );
};

export default Security;
