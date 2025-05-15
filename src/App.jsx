import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@material-tailwind/react';
import CssBaseline from '@mui/material/CssBaseline';
import i18n from './i18n';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';
import 'bulma/css/bulma.css';
import ContactUsPage from './pages/ContactUs';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;