import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AllInvoicesTab from "@/components/dashboard/AllInvoicesTab";
import KycDetailsTab from "@/components/dashboard/KycDetailsTab";

import KycStatusCard from '@/components/dashboard/KycStatusCard';
import PayoutCard from '@/components/dashboard/PayoutCard';
import RecentInvoicesCard from '@/components/dashboard/RecentInvoicesCard';

import { useGetDashboardQuery, useGetInvoicesQuery } from "@/lib/api/commonApi";
import { clearAuth } from "@/utils/auth";

const Dashboard = () => {

  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<string>("home");

  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useGetDashboardQuery();

  const {
    data: invoiceData,
    isLoading: isInvoicesLoading,
    error: invoicesError,
  } = useGetInvoicesQuery({
    page,
    limit,
    sortBy: "created_at",
    sortOrder: "DESC",
    status: "paid",
    enabled: activeTab === "invoices",
  });

  useEffect(() => {
    if (dashboardError || invoicesError) {
      toast({
        title: "Failed to load data",
        description: dashboardError?.message || invoicesError?.message,
        variant: "destructive"
      });
    }
  }, [dashboardError, invoicesError, toast]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleDownloadInvoice = async (invoiceId: string, status: string) => {
    
    // if (status !== "paid") {
    //   toast({ title: "Invoice not available", description: "Only paid invoices can be downloaded.", variant: "destructive" });
    //   return;
    // }

    // try {
    //   const response = await downloadInvoiceApiCall(invoiceId);
    //   const blob = new Blob([response.data], { type: "application/pdf" });
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = `invoice_${invoiceId}.pdf`;
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // } catch (error: any) {
    //   toast({
    //     title: "Download failed",
    //     description: error?.response?.data?.message || error.message,
    //     variant: "destructive",
    //   });
    // }

  };

  if (isDashboardLoading || !dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-myntra-purple"></div>
      </div>
    );
  }

  const { affiliateId, kycStatus, payout_info } = dashboardData.result;
  const formattedDate = new Date(payout_info.last_payout_date).toLocaleDateString();


  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader affiliateId={affiliateId} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6 sm:space-y-8"
        >
          <TabsList className="bg-white shadow-sm rounded-md w-full grid grid-cols-3 h-auto p-1">
            <TabsTrigger value="home" className="text-base sm:text-lg py-2 px-2 sm:px-3">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-base sm:text-lg py-2 px-2 sm:px-3">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="kyc" className="text-base sm:text-lg py-2 px-2 sm:px-3">
              KYC Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <KycStatusCard kycStatus={kycStatus} />

                <PayoutCard
                  amount={payout_info.net_payout}
                  subtext={
                  payout_info.last_payout && payout_info.last_payout_date ? `Last payout: ₹${payout_info.last_payout} on ${formattedDate}` : "No payout history available"}
                />
              </div>

              <RecentInvoicesCard
                invoices={invoiceData?.result || []}
                onViewAll={() => setActiveTab("invoices")}
              />
            </div>

          </TabsContent>

          <TabsContent value="invoices">
            <AllInvoicesTab
              invoices={invoiceData?.invoices || []}
              page={page}
              setPage={setPage}
              totalPages={invoiceData?.totalPages || 1}
              isLoading={isInvoicesLoading}
            />
          </TabsContent>

          <TabsContent value="kyc">
            <KycDetailsTab kycDetails={kycStatus}
            />
          </TabsContent>

        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
