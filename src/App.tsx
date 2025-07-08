
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import KYC from "./pages/KYC";
import KYCSuccess from "./pages/KYCSuccess";
import Dashboard from "./pages/Dashboard";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAffiliateDetails from "./pages/AdminAffiliateDetails";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => {

  // const { connect: connectWebSocket, isAuthenticated: isAuthenticated } = useWebSocket();

  // useEffectOnce(() => {
  //   const { status, message } = connectWebSocket("7062019342", "AFF321");
  //   if (status) {
  //     toast.success(message);
  //     // isAuthenticated();
  //   } else {
  //     toast.error(message);
  //   }
  // });


  return (

    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/signup?affiliateId=MYNTRA123" />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/kyc" element={<KYC />} />
            <Route path="/kyc-success" element={<KYCSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/affiliate/:id" element={<AdminAffiliateDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
