import InvestorDashboard from '@/components/investor/page';
import Landing from '@/components/home/page';
import TraderDashboard from '@/components/trader/page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TradingPage from '@/components/trader/trading/page';
import ProtectedRoute from '@/components/ProtectedRoute';
import Activation from '@/components/auth/Activation';
// import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes: React.FC = () => {
    return (
      // <Routes>
      //   <Route path="/" element={<Landing />} />
      //   <Route path="/activate/:token" element={<Activation />} />
      //   <Route
      //     path="/investor"
      //     element={
      //       <ProtectedRoute>
      //         <InvestorDashboard />
      //       </ProtectedRoute>
      //     }
      //   />
      //   <Route
      //     path="/trader"
      //     element={
      //       <ProtectedRoute>
      //         <TraderDashboard />
      //       </ProtectedRoute>
      //     }
      //   />
      //   <Route
      //     path="/trader/trading"
      //     element={
      //       <ProtectedRoute>
      //         <TradingPage />
      //       </ProtectedRoute>
      //     }
      //   />
      // </Routes>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/activate/:token" element={<Activation />} />
        <Route
          path="/investor"
          element={
              <InvestorDashboard />

          }
        />
        <Route
          path="/trader"
          element={

              <TraderDashboard />

          }
        />
        <Route
          path="/trader/trading"
          element={

              <TradingPage />

          }
        />
      </Routes>
    );
};

export default AppRoutes;