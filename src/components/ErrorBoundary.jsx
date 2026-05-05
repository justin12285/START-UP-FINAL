import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'sans-serif',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            background: '#4f46e5',
            padding: '16px',
            borderRadius: '24px',
            marginBottom: '24px'
          }}>
            <svg width="48" height="48" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>transee</h1>
          <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Something went wrong loading the app.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '16px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Tap to Reload
          </button>
          <p style={{ color: '#475569', fontSize: '11px', marginTop: '24px' }}>
            {this.state.error?.message}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
