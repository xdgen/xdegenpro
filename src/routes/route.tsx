import InvestorDashboard from '@/components/investor/page';
import Landing from '@/components/home/page';
import TraderDashboard from '@/components/trader/page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/trader" element={<TraderDashboard />} />
            <Route path="/investor" element={<InvestorDashboard />} />
        </Routes>
    );
};

export default AppRoutes;