import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import AuthLayout from "@/components/layouts/AuthLayout";
import InputField from "@/components/forms/InputField";
import { useToast } from "@/components/ui/use-toast";
import { FormError } from "@/components/stack/stack";

import { kycSchema } from "@/schema/common";
import { useSubmitKycMutation, useGetKycStatusQuery } from "@/lib/api/commonApi";

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

  const { data: kycStatus, isLoading } = useGetKycStatusQuery();

  const {
    mutate: submitKyc,
    isLoading: isSubmitting,
  } = useSubmitKycMutation({
    onSuccess: (res: any) => {
      if (res?.status !== 200 || res?.success !== true) {
        toast({
          title: "KYC Failed",
          description: res?.msg || "Something went wrong",
          variant: "destructive",
        });
      } else {
        toast({
          title: "KYC Submitted",
          description: res?.msg || "KYC successfully submitted",
        });
        navigate("/dashboard");
      }
    },
    onError: (error: any) => {
      toast({
        title: "KYC Submission Failed",
        description: error?.response?.data?.msg || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (kycStatus?.result?.status === "completed") {
      toast({
        title: "KYC Already Submitted",
        description: "Redirecting to dashboard...",
      });
      navigate("/dashboard");
    }
  }, [kycStatus, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-myntra-purple"></div>
      </div>
    );
  }

  return (
    <AuthLayout
      title="KYC Verification"
      subtitle="Complete your KYC to start receiving payments"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={kycSchema}
        onSubmit={(values) => {
          console.log(TAG, "Form Data ===>", values);
          submitKyc(values);
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form className="space-y-6">
            <InputField
              label="PAN Number"
              name="pan"
              value={values.pan}
              onChange={(e) => setFieldValue("pan", e.target.value)}
              maxLength={10}
            />
            {errors.pan && <FormError errors={errors} touched={touched} />}

            <InputField
              label="GSTIN (Optional)"
              name="gstin"
              value={values.gstin}
              onChange={(e) => setFieldValue("gstin", e.target.value)}
              maxLength={15}
            />
            {errors.gstin && <FormError errors={errors} touched={touched} />}

            <InputField
              label="Account Number"
              name="accountNumber"
              type="password"
              value={values.accountNumber}
              onChange={(e) => setFieldValue("accountNumber", e.target.value)}
            />
            {errors.accountNumber && <FormError errors={errors} touched={touched} />}

            <InputField
              label="Confirm Account Number"
              name="confirmAccountNumber"
              type="password"
              value={values.confirmAccountNumber}
              onChange={(e) => setFieldValue("confirmAccountNumber", e.target.value)}
            />
            {errors.confirmAccountNumber && <FormError errors={errors} touched={touched} />}

            <InputField
              label="IFSC Code"
              name="ifsc"
              value={values.ifsc}
              onChange={(e) => setFieldValue("ifsc", e.target.value)}
              maxLength={11}
            />
            {errors.ifsc && <FormError errors={errors} touched={touched} />}

            <InputField
              label="Account Holder Name"
              name="accountName"
              value={values.accountName}
              onChange={(e) => setFieldValue("accountName", e.target.value)}
            />
            {errors.accountName && <FormError errors={errors} touched={touched} />}

            <Button
              type="submit"
              className="w-full bg-myntra-purple hover:bg-myntra-dark"
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
