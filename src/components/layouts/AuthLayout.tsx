
import React from 'react';

import { Card } from "@/components/ui/card";

import MyntraLogo from '../MyntraLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <MyntraLogo className="mx-auto h-10 w-auto" size="large" />
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
        </div>
        <Card className="auth-card">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
