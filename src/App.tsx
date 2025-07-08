
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import KYC from "./pages/KYC";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAffiliateDetails from "./pages/AdminAffiliateDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AuthRedirect from "./components/common/AuthRedirect";
import RootRedirect from "./components/common/RootRedirect";


const queryClient = new QueryClient();

const App = () => {

  return (

    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<RootRedirect />} />

            <Route path="/signup" element={
              <AuthRedirect>
                <Signup />
              </AuthRedirect>
            } />
            <Route path="/login" element={
              <AuthRedirect>
                <Login />
              </AuthRedirect>
            } />

            <Route path="/kyc" element={
              <ProtectedRoute requireAuth={true} requireAffiliate={true}>
                <KYC />
              </ProtectedRoute>
            } />

            <Route path="/dashboard" element={
              <ProtectedRoute requireAuth={true} requireAffiliate={true}>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />

            <Route path="/admin/affiliate/:id" element={
              <ProtectedRoute requireAuth={true} requireAdmin={true}>
                <AdminAffiliateDetails />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
