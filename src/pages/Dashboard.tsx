import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabContent from "@/components/dashboard/DashboardTabContent";
import AllInvoicesTab from "@/components/dashboard/AllInvoicesTab";
import KycDetailsTab from "@/components/dashboard/KycDetailsTab";

import {
  useGetDashboardQuery,
  useGetInvoicesQuery,
} from "@/lib/api/commonApi";
import { downloadInvoiceApiCall } from "@/lib/api/services";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("home");

  const token = localStorage.getItem("auth_token");
  const mobile = localStorage.getItem("user_mobile");

  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    if (!token || !mobile) {
      toast({
        title: "Session expired",
        description: "Please login again",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [token, mobile, navigate, toast]);

  // Fetch dashboard data
  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    error: dashboardError,
  } = useGetDashboardQuery();

  // Fetch invoices (paginated from DB)
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
        variant: "destructive",
      });
    }
  }, [dashboardError, invoicesError, toast]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_mobile");
    localStorage.removeItem("user_details");
    navigate("/login");
  };

  const handleDownloadInvoice = async (invoiceId: string, status: string) => {
    if (status !== "paid") {
      toast({
        title: "Invoice not available",
        description: "Only paid invoices can be downloaded.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await downloadInvoiceApiCall(invoiceId);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${invoiceId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download failed",
        description: error?.response?.data?.message || error.message,
        variant: "destructive",
      });
    }
  };

  if (isDashboardLoading || !dashboardData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-myntra-purple"></div>
      </div>
    );
  }

  const { affiliateId, kycStatus, payout_info } = dashboardData.result;

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
            <DashboardTabContent
              invoices={dashboardData.result.invoices || []}
              kycStatus={{
                status: kycStatus.status,
                requestDate: new Date(kycStatus.request_date).toLocaleDateString(),
                date: new Date(kycStatus.last_updated).toLocaleDateString(),
                requestData: {
                  submittedOn: new Date(kycStatus.last_updated).toLocaleDateString(),
                  idType: kycStatus.submitted_info.id_type,
                  idNumber: kycStatus.submitted_info.id_number,
                  bankAccount: kycStatus.submitted_info.bank_account,
                  ifscCode: kycStatus.submitted_info.ifsc_code,
                  accountHolder: kycStatus.submitted_info.account_holder,
                },
              }}
              payoutInfo={{
                netPayout: `₹${payout_info.net_payout}`,
                lastPayout: `₹${payout_info.last_payout}`,
                lastPayoutDate: "", // Add if backend sends
              }}
              onViewAllInvoices={() => setActiveTab("invoices")}
              onDownloadInvoice={(id) => {
                const invoice = dashboardData.result.invoices?.find(inv => inv.id === id);
                handleDownloadInvoice(id, invoice?.status || "");
              }}
            />
          </TabsContent>

          <TabsContent value="invoices">
            <AllInvoicesTab
              invoices={invoiceData?.invoices || []}
              onDownload={(id, status) => handleDownloadInvoice(id, status)}
              page={page}
              setPage={setPage}
              totalPages={invoiceData?.totalPages || 1}
              isLoading={isInvoicesLoading}
            />
          </TabsContent>

          <TabsContent value="kyc">
            <KycDetailsTab
              kycDetails={{
                idType: kycStatus.submitted_info.id_type,
                idValue: kycStatus.submitted_info.id_number,
                accountNumber: kycStatus.submitted_info.bank_account,
                ifsc: kycStatus.submitted_info.ifsc_code,
                accountName: kycStatus.submitted_info.account_holder,
              }}
              kycStatus={{
                status: kycStatus.status,
                date: new Date(kycStatus.last_updated).toLocaleDateString(),
                requestDate: new Date(kycStatus.request_date).toLocaleDateString(),
                requestData: {},
              }}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
