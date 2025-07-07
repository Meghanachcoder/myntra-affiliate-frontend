import React from 'react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="text-2xl font-semibold text-red-600">Something went wrong.</h2>
          <p className="text-gray-600 mt-2">Please try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
