import React, {Component, ReactNode} from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }

    return this.props.children;
  }
}

const FallbackComponent: React.FC = () => (
  <div>
    <h1>Something went wrong.</h1>
    <p>Please try refreshing the page or come back later.</p>
  </div>
);

export default ErrorBoundary;
