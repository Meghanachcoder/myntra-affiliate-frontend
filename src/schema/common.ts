import * as yup from "yup";

import { minLength, maxLength, keyRequired, keyInvalid } from "@/utils/messages";

export const mobileNumberSchema = yup.object().shape({
  mobileNumber: yup
    .number()
    .positive("Mobile number must be positive")
    .integer("Mobile number must be an integer")
    .min(1000000000, minLength)
    .max(9999999999, maxLength)
    .required(keyRequired.replace("%key%", "Mobile number")),
});


export const otpSchema = yup.object().shape({

  otp: yup
    .string()
    .required(keyRequired.replace("%key%", "OTP"))
    .length(6, keyInvalid.replace('%key%', 'OTP')),

});

export const signupSchema = yup.object().shape({
  mobileNumber: yup
    .number()
    .typeError(keyInvalid.replace('%key%', 'Mobile number'))
    .positive(keyInvalid.replace('%key%', 'Mobile number'))
    .integer(keyInvalid.replace('%key%', 'Mobile number'))
    .min(1000000000, minLength)
    .max(9999999999, maxLength)
    .required(keyRequired.replace('%key%', 'Mobile number')),
});


export const signupOtpSchema = yup.object().shape({
  otp: yup
    .string()
    .required(keyRequired.replace('%key%', 'OTP'))
    .length(6, keyInvalid.replace('%key%', 'OTP')),
});


export const kycSchema = yup.object().shape({

  pan: yup
    .string()
    .required(keyRequired.replace("%key%", "PAN Number"))
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, keyInvalid.replace("%key%", "PAN Number")),

  gstin: yup
    .string()
    .notRequired()
    .matches(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}Z[A-Z\d]{1}$/, keyInvalid.replace("%key%", "GSTIN")),

  accountNumber: yup
    .string()
    .required(keyRequired.replace("%key%", "Account Number"))
    .matches(/^\d{9,18}$/, keyInvalid.replace("%key%", "Account Number")),

  confirmAccountNumber: yup
    .string()
    .required(keyRequired.replace("%key%", "Confirm Account Number"))
    .oneOf([yup.ref("accountNumber")], "Account numbers do not match"),

  ifsc: yup
    .string()
    .required(keyRequired.replace("%key%", "IFSC Code"))
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, keyInvalid.replace("%key%", "IFSC Code")),

  accountName: yup
    .string()
    .trim()
    .required(keyRequired.replace("%key%", "Account Holder Name")),
});
