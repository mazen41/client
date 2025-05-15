import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  styled,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Divider,
  useTheme,
  IconButton,
  Toolbar,
  useMediaQuery,
  AppBar,
  Box,
  CssBaseline
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  ShoppingCart as ShoppingCartIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  AccountBalance as AccountBalanceIcon,
  Replay as RefundIcon,
  Description as DescriptionIcon,
  Link as LinkIcon,
  BackupTable as BackupTableIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  PointOfSale as PointOfSaleIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Group as GroupIcon,
  LocalShipping as LocalShippingIcon,
  SettingsApplications as SettingsApplicationsIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  ContactSupport as ContactSupportIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const drawerWidth = 240;
const collapsedWidth = 72;

const SidebarContainer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.background.paper,
    borderRight: 'none',
  },
  '& .MuiDrawer-paperCollapsed': {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: collapsedWidth,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
  },
}));

const SidebarLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    '& .MuiListItemButton-root': {
      borderLeft: `4px solid ${theme.palette.primary.main}`,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(2, 2, 1, 2),
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginTop: "60px",
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const DropdownMenu = ({ icon, title, items, collapsed, forceOpen = false }) => {
  const [open, setOpen] = useState(forceOpen);
  const theme = useTheme();

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
    }
  }, [forceOpen]);

  const isExpanded = forceOpen || !collapsed;

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>{icon}</ListItemIcon>
        {isExpanded && <ListItemText primary={title} />}
        {isExpanded && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((item) => (
            <SidebarLink to={item.path} key={item.text}>
              <ListItemButton sx={{ pl: isExpanded ? 4 : 2 }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {isExpanded && <ListItemText primary={item.text} />}
              </ListItemButton>
            </SidebarLink>
          ))}
        </List>
      </Collapse>
    </>
  );
};

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Determine if the current language is RTL
  const isRTL = i18n.dir() === 'rtl';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  const renderLink = (path, icon, text, collapsed) => (
    <SidebarLink to={path}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          {(mobileOpen || !collapsed) && <ListItemText primary={text} />}
        </ListItemButton>
      </ListItem>
    </SidebarLink>
  );

  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: 'flex-end', minHeight: '64px !important' }}>
        {!collapsed && !isMobile && (
          <IconButton onClick={handleCollapseToggle}>
            {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>
      <List sx={{ pt: 0 }}>
        {(mobileOpen || !collapsed) && <SectionTitle>{t('sidebar.dashboard')}</SectionTitle>}
        {renderLink("/dashboard", <DashboardIcon />, t('sidebar.overview'), collapsed)}

        {(mobileOpen || !collapsed) && <Divider sx={{ my: 1 }} />}
        {(mobileOpen || !collapsed) && <SectionTitle>{t('sidebar.payment')}</SectionTitle>}
        {renderLink("/dashboard/invoices", <ReceiptIcon />, t('sidebar.invoices'), collapsed)}
        {renderLink("/dashboard/orders", <ShoppingCartIcon />, t('sidebar.orders'), collapsed)}
        {renderLink("/dashboard/transactions", <AccountBalanceWalletIcon />, t('sidebar.transactions'), collapsed)}
        {renderLink("/dashboard/depoist", <AccountBalanceIcon />, t('sidebar.deposits'), collapsed)}
        {renderLink("/dashboard/account-statement", <DescriptionIcon />, t('sidebar.accountStatements'), collapsed)}
        {renderLink("/dashboard/payments-links", <LinkIcon />, t('sidebar.paymentLinks'), collapsed)}
        {renderLink("/dashboard/batch-invoices", <BackupTableIcon />, t('sidebar.batchInvoices'), collapsed)}

        {(mobileOpen || !collapsed) && <Divider sx={{ my: 1 }} />}

        <DropdownMenu
          icon={<InventoryIcon />}
          title={t('sidebar.products')}
          items={[
            { text: t('sidebar.productLinks'), icon: <LinkIcon />, path: '/dashboard/products' },
            { text: t('sidebar.categories'), icon: <BackupTableIcon />, path: '/dashboard/categories' },
            { text: t('sidebar.deliveryAreas'), icon: <LocationOnIcon />, path: '/dashboard/delivery-areas' },
            { text: t('sidebar.workTime'), icon: <SettingsApplicationsIcon />, path: '/dashboard/work-time' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        <DropdownMenu
          icon={<RefundIcon />}
          title={t('sidebar.refunds')}
          items={[
            { text: t('sidebar.refundList'), icon: <DescriptionIcon />, path: '/dashboard/refund-list' },
            { text: t('sidebar.makeRefund'), icon: <ReceiptIcon />, path: '/dashboard/make-refund' },
            { text: t('sidebar.refundApprovals'), icon: <GroupIcon />, path: '/dashboard/refund-approval' },
            { text: t('sidebar.buildRefunds'), icon: <BackupTableIcon />, path: '/dashboard/bulk-refund' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        <DropdownMenu
          icon={<PeopleIcon />}
          title={t('sidebar.customers')}
          items={[
            { text: t('sidebar.customers'), icon: <PeopleIcon />, path: '/dashboard/customers' },
            { text: t('sidebar.importCustomers'), icon: <IntegrationInstructionsIcon />, path: '/dashboard/import-customers' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        {renderLink("/dashboard/addresses", <BackupTableIcon />, t('sidebar.addresses'), collapsed)}

        <DropdownMenu
          icon={<PointOfSaleIcon />}
          title={t('sidebar.pos')}
          items={[
            { text: t('sidebar.terminals'), icon: <PointOfSaleIcon />, path: '/dashboard/terminals' },
            { text: t('sidebar.transactions'), icon: <AccountBalanceWalletIcon />, path: '/dashboard/transactions' },
            { text: t('sidebar.deposits'), icon: <AccountBalanceIcon />, path: '/dashboard/deposits' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        <DropdownMenu
          icon={<BusinessIcon />}
          title={t('sidebar.businessProfile')}
          items={[
            { text: t('sidebar.updateProfile'), icon: <BusinessIcon />, path: '/dashboard/business-profile' },
            { text: t('sidebar.commissionCharges'), icon: <SettingsApplicationsIcon />, path: '/dashboard/commissions' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        <DropdownMenu
          icon={<GroupIcon />}
          title={t('sidebar.users')}
          items={[
            { text: t('sidebar.usersList'), icon: <GroupIcon />, path: '/dashboard/users' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        <DropdownMenu
          icon={<LocalShippingIcon />}
          title={t('sidebar.suppliers')}
          items={[
            { text: t('sidebar.suppliersList'), icon: <GroupIcon />, path: '/dashboard/suppliers-list' },
            { text: t('sidebar.suppliersDepoist'), icon: <GroupIcon />, path: '/dashboard/suppliers-depoists' },
          ]}
          collapsed={collapsed}
          forceOpen={mobileOpen}
        />

        {(mobileOpen || !collapsed) && <Divider sx={{ my: 1 }} />}
        {renderLink("/dashboard/contact", <ContactSupportIcon />, t('sidebar.contact'), collapsed)}
      </List>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)` },
          [isRTL ? 'right' : 'left']: { sm: `${collapsed ? collapsedWidth : drawerWidth}px` },
          boxShadow: 'none',
          backgroundColor: 'transparent',
          color: '#000',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge={isRTL ? 'end' : 'start'}
            onClick={handleDrawerToggle}
            sx={{
              [isRTL ? 'ml' : 'mr']: 2,
              display: { sm: 'none' },
              marginTop: '18%',
              background: 'none',
              color: '#000',
              '&:hover': {
                background: 'none',
              },
              '& .MuiSvgIcon-root': {
                fontSize: '2rem',
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: collapsed ? collapsedWidth : drawerWidth },
          flexShrink: { sm: 0 },
          [isRTL ? 'right' : 'left']: 0
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              boxShadow: 'none',
              [isRTL ? 'right' : 'left']: 0
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: collapsed ? collapsedWidth : drawerWidth,
              boxShadow: 'none',
              [isRTL ? 'right' : 'left']: 0,
              borderRight: isRTL ? 'none' : '1px solid rgba(0, 0, 0, 0.12)',
              borderLeft: isRTL ? '1px solid rgba(0, 0, 0, 0.12)' : 'none'
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;