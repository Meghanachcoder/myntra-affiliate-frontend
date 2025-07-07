export const FormError = ({ errors }: { errors: any }) => {
  return <p className="text-[11px] text-red-600">{errors.mobileNumber as any}</p>
}

