import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

import Landing from "@/components/home/page";
import InvestorDashboard from "@/components/investor/page";
import TraderDashboard from "@/components/trader/page";
import TradingPage from "@/components/trader/trading/page";
import DexPage from "@/components/dex/page";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/investor" element={<InvestorDashboard />} />
        <Route path="/trader" element={<TraderDashboard />} />
        <Route path="/trader/trading" element={<TradingPage />} />
        <Route path="/dex" element={<DexPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;