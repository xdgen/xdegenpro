import InvestorDashboard from '@/components/investor/page';
import Landing from '@/components/home/page';
import TraderDashboard from '@/components/trader/page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TradingPage from '@/components/trader/trading/page';
import DexPage from '@/components/dex/page';
const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/investor" element={<InvestorDashboard />} />
            <Route path="/trader" element={<TraderDashboard />} />
            <Route path="/trader/trading" element={<TradingPage />} />
            <Route path="/dex" element={<DexPage />} />
        </Routes>
    );
};

export default AppRoutes;