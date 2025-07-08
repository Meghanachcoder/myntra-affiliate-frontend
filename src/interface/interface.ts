export type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

export type RecentInvoicesCardProps = {
  invoices: Invoice[];
  onViewAll: () => void;
};


export type KycStatusProps = {
  status: 'Verified' | 'Pending' | 'Rejected' | string;
  date: string;
  requestDate: string;
};

export type PayoutCardProps = {
  amount: string;
  subtext: string;
};

export type KycDetailsTabProps = {
  kycDetails: {
    idType: string;
    idValue: string;
    accountNumber: string;
    ifsc: string;
    accountName: string;
  };
  kycStatus: {
    status: string;
    date: string;
    requestDate: string;
  };
};