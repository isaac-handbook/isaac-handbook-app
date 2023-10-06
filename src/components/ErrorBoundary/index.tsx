import React from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component<{
  onCatch?: (error: Error) => void;
  children?: React.ReactNode;
}> {
  state = {
    error: false,
    e: null,
  };

  componentDidCatch(error: Error) {
    console.log('ErrorBoundary');
    console.error(error);
    if (this.props.onCatch) {
      this.props.onCatch(error);
    }
    this.setState({
      error: true,
      e: error,
    });
  }

  reload() {
    this.setState({ error: false });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
