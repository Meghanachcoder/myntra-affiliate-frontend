import * as yup from "yup";

import { minLength, maxLength, keyRequired } from "@/utils/messages";

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
    .min(6, minLength)
    .max(6, maxLength),

});



