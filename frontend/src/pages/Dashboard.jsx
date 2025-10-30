import React from "react";
import ModernDashboard from "../components/ModernDashboard";

const Dashboard = ({ currentReading, history, isConnected }) => {
  return (
    <ModernDashboard 
      currentReading={currentReading}
      history={history}
      isConnected={isConnected}
    />
  );
};

export default Dashboard;
