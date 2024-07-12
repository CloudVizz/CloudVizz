import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/google/callback" element={<OAuthCallback />} />
        <Route path="/auth/github/callback" element={<OAuthCallback />} />
      </Routes>
    </Router>
  );
};

const OAuthCallback = () => {
  React.useEffect(() => {
    window.location.href = '/dashboard';
  }, []);

  return <div>Loading...</div>;
};

export default App;
