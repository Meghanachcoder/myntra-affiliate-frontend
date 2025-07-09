import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate, Navigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";
import InputField from "@/components/forms/InputField";
import { useToast } from "@/components/ui/use-toast";
import { FormError } from "@/components/stack/stack";

import { kycSchema } from "@/schema/common";
import { useSubmitKycMutation, useGetKycStatusQuery } from "@/lib/api/commonApi";
import { logHelper } from "@/utils/utils";
import { clearAuth } from "@/utils/auth";

const TAG = "KYC: ";

const initialValues = {
  pan: "",
  gstin: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifsc: "",
  accountName: "",
};

const KYC = () => {

  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: kycStatus,
    isLoading: isLoading,
    error: kycStatusError,
  } = useGetKycStatusQuery();

  const {
    mutate: submitKyc,
  } = useSubmitKycMutation();

  function handleSubmit(values: any) {

    logHelper(TAG, " Form Data ===> ", values);

    setIsSubmitting(true);


    submitKyc(values, {
      onSuccess: async (res: any) => {

        logHelper(TAG, " KYC Success ===> ", res);

        if (res?.status !== 200 || res?.success !== true) {
          toast({ title: "KYC Failed", description: res?.msg || "Something went wrong", variant: "destructive" });
        } else {

          const userDetails = localStorage.getItem("user_details");
          const user = JSON.parse(userDetails || "{}");
          user.is_kyc_submitted = true;
          localStorage.setItem("user_details", JSON.stringify(user));

          toast({ title: "KYC Submitted", description: res?.msg || "KYC successfully submitted", });
          await new Promise(resolve => setTimeout(resolve, 2000)).then(() => {
            window.location.reload();
          });

        }
      },
      onError: (error: any) => {
        toast({ title: "KYC Submission Failed", description: error?.response?.data?.msg || "Something went wrong", variant: "destructive" });
      },
      onSettled: () => {
        setIsSubmitting(false);
      }

    });

  }

  useEffect(() => {
    if (kycStatus?.result?.status === "completed") {
      toast({ title: "KYC Already Submitted", description: "Redirecting to dashboard..." });
      navigate("/dashboard");
    }
  }, [kycStatus, navigate, toast]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-myntra-purple"></div>
  //     </div>
  //   );
  // }


  logHelper(TAG, " kycStatus ===> ", kycStatus);

  if (kycStatus?.result?.status === "pending") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuthLayout
      title="KYC Verification"
      subtitle="Complete your KYC to start receiving payments"
    >

      <div className="absolute top-[0.5rem] right-[0.5rem]">
        <Button onClick={() => {
          clearAuth();
          navigate("/login");
        }}>
          Logout
        </Button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={kycSchema}
        onSubmit={(values) => { handleSubmit(values); }}
      >

        {({ values, errors, touched, setFieldValue }) => (
          <Form className="flex flex-col gap-2">

            <div>
              <InputField
                label="PAN Number"
                name="pan"
                id="pan"
                value={values.pan}
                placeholder="Enter your PAN number"
                onChange={(e) => setFieldValue("pan", e.target.value)}
                maxLength={10}
                disabled={isSubmitting}
              />
              {errors.pan && touched.pan && <FormError errors={errors.pan} />}
            </div>

            <div>
              <InputField
                label="GSTIN (Optional)"
                name="gstin"
                id="gstin"
                value={values.gstin}
                placeholder="Enter GSTIN (if available)"
                onChange={(e) => setFieldValue("gstin", e.target.value)}
                maxLength={15}
                disabled={isSubmitting}
              />
              {errors.gstin && touched.gstin && <FormError errors={errors.gstin} />}
            </div>

            <div>
              <InputField
                label="Account Number"
                name="accountNumber"
                id="accountNumber"
                type="password"
                placeholder="Enter your account number"
                value={values.accountNumber}
                onChange={(e) => setFieldValue("accountNumber", e.target.value)}
                disabled={isSubmitting}
              />
              {errors.accountNumber && touched.accountNumber && <FormError errors={errors.accountNumber} />}
            </div>


            <div>
              <InputField
                label="Confirm Account Number"
                name="confirmAccountNumber"
                id="confirmAccountNumber"
                type="password"
                placeholder="Re-enter your account number"
                value={values.confirmAccountNumber}
                onChange={(e) => setFieldValue("confirmAccountNumber", e.target.value)}
                disabled={isSubmitting}
              />
              {errors.confirmAccountNumber && touched.confirmAccountNumber && <FormError errors={errors.confirmAccountNumber} />}
            </div>

            <div>
              <InputField
                label="IFSC Code"
                name="ifsc"
                id="ifsc"
                placeholder="Enter IFSC code"
                value={values.ifsc}
                onChange={(e) => setFieldValue("ifsc", e.target.value)}
                maxLength={11}
                disabled={isSubmitting}
              />
              {errors.ifsc && touched.ifsc && <FormError errors={errors.ifsc} />}
            </div>

            <div>
              <InputField
                label="Account Holder Name"
                name="accountName"
                id="accountName"
                placeholder="Enter account holder name"
                value={values.accountName}
                onChange={(e) => setFieldValue("accountName", e.target.value)}
                disabled={isSubmitting}
              />
              {errors.accountName && touched.accountName && <FormError errors={errors.accountName} />}
            </div>

            <Button
              type="submit"
              className="w-full bg-myntra-purple hover:bg-myntra-dark mt-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit KYC Details"}
            </Button>

          </Form>
        )}
      </Formik>

    </AuthLayout>
  );
};

export default KYC;
