
import React, { forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={cn("form-group !mt-0 !mb-0", className)}>
        <Label 
          htmlFor={props.id || props.name} 
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </Label>
        <Input
          ref={ref}
          {...props}
          className={cn(error ? "border-red-500 focus:ring-red-500" : "")}
        />
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
