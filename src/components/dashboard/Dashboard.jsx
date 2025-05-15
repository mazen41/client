import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

// Import your components
import Navbar from '../DahsboardNavbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import DashboardPage from '../../pages/DashboardPage';
import Invoices from '../invoices/Invoices';
import Orders from '../orders/Orders';
import Transactions from '../transactions/Transactions';
import Depoist from '../depoist/Depoist';
import AccountStatement from '../accountStatment/AccountStatement';
import PaymentLinks from '../paymentLink/PaymentLinks';
import BatchInvoices from '../BatchInvocies/BatchInvocies';
import Products from '../products/Products';
import Categories from '../../pages/Categories';
import DeliveryAreas from '../../pages/DeliveryAreas';
import WorkTime from '../../pages/WorkTime';
import Customers from '../../pages/Customers';
import RefundList from '../../pages/RefundList';
import MakeRefund from '../../pages/MakeRefund';
import RefundApproval from '../../pages/RefundApproval';
import BulkRefunds from '../../pages/BulkRefund';
import Terminals from '../../pages/Terminals';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import CommissionCharger from '../../pages/CommissionCharger';
import UsersList from '../../pages/UsersList';
import SuppliersList from '../../pages/SuppliersList';
import SuppliersDeposits from '../../pages/SuppliersDeposits';
import AddressManagement from '../../pages/Addresses';
import ContactManagement from '../../pages/Contact';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('token') || null
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
const navigate = useNavigate();

  useEffect(() => {
    // Check if token doesn't exist
    if (!token) {
      // Redirect to login page
      navigate('/login'); // Adjust the path to your actual login route
    }
  }, [token, navigate]);
  

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'scroll' }}>
      {/* Navbar at top with mobile menu button */}
      <Box component="header" sx={{ width: '100%', position: 'fixed', zIndex: 1300 }}>
        <Navbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Navbar>
      </Box>

      {/* Sidebar and Content */}
      <Box sx={{ display: 'flex', flexGrow: 1, pt: 8 }}> {/* pt to offset Navbar */}
        {/* Sidebar - now using the responsive version */}
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        {/* Main Content */}
        <Box 
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            bgcolor: '#fafafa', 
            height: 'calc(100vh - 64px)', 
            overflowY: 'auto',
            // ml: { sm: '240px', xs: 0 }, // Adjust margin based on screen size
            width: { sm: `calc(100% - 240px)`, xs: '100%' }, 
            // marginRight: isArabic ? "-10%" : "0%"
          }}
        >
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/depoist" element={<Depoist />} />
            <Route path="/account-statement" element={<AccountStatement />} />
            <Route path="/payments-links" element={<PaymentLinks />} />
            <Route path="/batch-invoices" element={<BatchInvoices />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/delivery-areas" element={<DeliveryAreas />} />
            <Route path="/work-time" element={<WorkTime />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/refund-list" element={<RefundList />} />
            <Route path="/make-refund" element={<MakeRefund />} />
            <Route path="/refund-approval" element={<RefundApproval />} />
            <Route path="/bulk-refund" element={<BulkRefunds />} />
            <Route path="/terminals" element={<Terminals />} />
            <Route path="/business-profile" element={<UpdateProfile />} />
            <Route path="/commissions" element={<CommissionCharger />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/suppliers-list" element={<SuppliersList />} />
            <Route path="/suppliers-depoists" element={<SuppliersDeposits />} />
            <Route path="/addresses" element={<AddressManagement />} />
            <Route path="/contact" element={<ContactManagement />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;