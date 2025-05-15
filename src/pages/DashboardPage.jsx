
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {
  Box,
  Grid,
  Typography,
  Select,
  MenuItem,
  Chip,
  Divider,
  Paper,
  styled
} from '@mui/material';
import {
  AccountBalance,
  SyncAlt,
  Warning,
  Payment,
  CheckCircle,
  Pending,
  Error
} from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-3px)'
  },
  overflow: "hidden",
  // marginLeft: "",
  // width: "100%"
}));

const DashboardPage = () => {
  const { t, i18n} = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [timeRange, setTimeRange] = useState('today');

  const lastPayments = [
    { id: '#1001', customer: 'Ahmed Ali', amount: 450, status: 'completed' },
    { id: '#1002', customer: 'Mohammed Omar', amount: 320, status: 'completed' },
    { id: '#1003', customer: 'Sarah Ahmed', amount: 680, status: 'pending' },
    { id: '#1004', customer: 'Fatima Khalid', amount: 210, status: 'failed' },
    { id: '#1005', customer: 'Khalid Hassan', amount: 890, status: 'completed' }
  ];

  const cardData = {
    awaitingBalance: 12500,
    awaitingTransfer: 8400,
    disputeAmount: 3200,
    lastPayments: lastPayments
  };

  const grossNetData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: t('dashboard.grossValue'),
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 10000) + 5000),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      },
      {
        label: t('dashboard.netValue'),
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 8000) + 3000),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.1
      }
    ]
  };

  const successFailedData = {
    labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: t('dashboard.successful'),
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: t('dashboard.failed'),
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 5),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
      }
    ]
  };

  const financialSummaryData = {
    labels: [t('dashboard.totalRefund'), t('dashboard.totalDeposit'), t('dashboard.totalPaid')],
    datasets: [
      {
        data: [1250, 8500, 15600],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const paymentMethodsData = {
    labels: ['Mada', 'Visa', 'Mastercard', 'Apple Pay', 'STC Pay'],
    datasets: [
      {
        data: [35, 25, 20, 15, 5],
        backgroundColor: [
          'rgba(0, 102, 51, 0.6)',
          'rgba(0, 51, 153, 0.6)',
          'rgba(204, 0, 0, 0.6)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(0, 153, 204, 0.6)'
        ],
        borderColor: [
          'rgba(0, 102, 51, 1)',
          'rgba(0, 51, 153, 1)',
          'rgba(204, 0, 0, 1)',
          'rgba(0, 0, 0, 1)',
          'rgba(0, 153, 204, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const timeRangeOptions = [
    { value: 'today', label: t('dashboard.today') },
    { value: 'yesterday', label: t('dashboard.yesterday') },
    { value: 'last7', label: t('dashboard.last7Days') },
    { value: 'last30', label: t('dashboard.last30Days') },
    { value: 'thisMonth', label: t('dashboard.thisMonth') },
    { value: 'lastMonth', label: t('dashboard.lastMonth') }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'pending': return <Pending color="warning" />;
      case 'failed': return <Error color="error" />;
      default: return null;
    }
  };

  // Chart data configurations remain the same...

  return (
    <Box style={{marginLeft: isArabic ? "-10%" : "10%"}}>
      {/* Header and Time Selector */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3
      }}>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          sx={{
            minWidth: 180,
            color: '#000',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#000'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#000'
            }
          }}
        >
          {timeRangeOptions.map(option => (
            <MenuItem key={option.value} value={option.value} sx={{ color: '#000' }}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          {
            label: 'awaitingBalance',
            amount: cardData.awaitingBalance,
            icon: <AccountBalance sx={{ fontSize: 40, color: '#000' }} />,
          },
          {
            label: 'awaitingTransfer',
            amount: cardData.awaitingTransfer,
            icon: <SyncAlt sx={{ fontSize: 40, color: '#000' }} />,
          },
          {
            label: 'disputeAmount',
            amount: cardData.disputeAmount,
            icon: <Warning sx={{ fontSize: 40, color: '#000' }} />,
          }
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ color: '#000 !important' }}>
                    {t(`dashboard.${card.label}`)}
                  </Typography>
                  <Typography variant="h4" sx={{ color: '#000', fontWeight: 700 }}>
                    {card.amount.toLocaleString()} SAR
                  </Typography>
                </Box>
                {card.icon}
              </Box>
            </DashboardCard>
          </Grid>
        ))}
      </Grid>

      {/* Last Payments */}
      <Grid container spacing={3} sx={{ mb: 3 }} style={{ overflow: "scroll" }}>
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#000' }}>
              {t('dashboard.lastPayments')}
            </Typography>
            <Divider sx={{ mb: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
            {cardData.lastPayments.map((payment) => (
              <Box key={payment.id} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                '&:last-child': { borderBottom: 'none' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Payment sx={{ mr: 2, color: '#000' }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, color: '#000' }}>
                      {payment.id}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#000' }}>
                      {payment.customer}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: '#000' }}>
                    {payment.amount} SAR
                  </Typography>
                  <Chip
                    icon={getStatusIcon(payment.status)}
                    label={t(`dashboard.statuses.${payment.status}`)}
                    size="small"
                    sx={{
                      mt: 0.5,
                      color: '#000',
                      backgroundColor: payment.status === 'completed' ? 'rgba(0,200,0,0.1)' :
                        payment.status === 'pending' ? 'rgba(255,165,0,0.1)' : 'rgba(255,0,0,0.1)'
                    }}
                  />
                </Box>
              </Box>
            ))}
          </DashboardCard>
        </Grid>

        {/* Financial Summary Pie Chart */}
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#000' }}>
              {t('dashboard.financialSummary')}
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={financialSummaryData} />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#000' }}>
              {t('dashboard.grossNetChart')}
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={grossNetData} />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#000' }}>
              {t('dashboard.successFailedChart')}
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={successFailedData} />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;