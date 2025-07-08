
import { Card, CardContent } from '@/components/ui/card';
import { useGetKycStatusQuery } from '@/lib/api/commonApi';
import { useWebSocket } from '@/hooks/use-websocket';
import { KycDetailsTabProps } from '@/interface/interface';
import { dateFormatter } from '@/utils/utils';


const TAG: string = "KycDetailsTab: ";
const KycDetailsTab = ({ kycDetails }: any) => {

  const { messages, sendMessage } = useWebSocket(`ws://localhost:5001?affiliateId=AFF321&mobile=7062019342`);

  const {
    data: kycStatusData,
    isLoading: isLoading,
    error: kycStatusError,
  } = useGetKycStatusQuery({
    refetchInterval: 5000
  });

  // const socketCall = async () => {

  //   const message = { type: 'ping' };
  //   sendMessage(JSON.stringify(message));

  //   const authData = { type: 'auth', token: localStorage.getItem("auth_token") };
  //   sendMessage(JSON.stringify(authData));

  //   await new Promise(resolve => setTimeout(resolve, 2000));

  //   console.log(TAG, " messages ===> ", messages);

  // }

  // console.log(TAG, " kycStatusData ===> ", kycStatusData);
  // console.log(TAG, " messages ===> ", messages);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">KYC Details</h2>
        </div>

        <div className="space-y-6">
          {/* KYC Status Section */}
          <div className="border-b pb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Current Status</h4>
                <p className="text-base">{kycStatusData?.result?.status}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Request Submitted On</h4>
                <p className="text-base">{dateFormatter(kycDetails?.request_date)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Submitted Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">ID Type</h4>
                <p className="text-base">{kycDetails?.submitted_info?.id_type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">{kycDetails?.submitted_info?.id_type} Number</h4>
                <p className="text-base">{kycDetails?.submitted_info?.id_number}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Bank Account Number</h4>
                <p className="text-base">{kycDetails?.submitted_info?.bank_account}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">IFSC Code</h4>
                <p className="text-base">{kycDetails?.submitted_info?.ifsc_code}</p>
              </div>
              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Account Holder Name</h4>
                <p className="text-base">{kycDetails?.submitted_info?.account_holder}</p>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default KycDetailsTab;
