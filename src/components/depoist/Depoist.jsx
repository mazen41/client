import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Button,
    Stack
} from '@mui/material';
import {
    Email as EmailIcon,
    Print as PrintIcon,
    FileCopy as CopyIcon,
    FileDownload as ExportIcon
} from '@mui/icons-material';

const Deposit = () => {
    const { t } = useTranslation();

    const depositsData = [
        { reference: 'BANK-REF-001', date: '2023-05-15', bank: 'Bank of America', total: 4500, notificationSent: true },
        { reference: 'CARD-REF-002', date: '2023-05-16', bank: 'Chase Bank', total: 3200, notificationSent: false },
        { reference: 'BANK-REF-003', date: '2023-05-17', bank: 'Wells Fargo', total: 6800, notificationSent: true },
        { reference: 'CARD-REF-004', date: '2023-05-18', bank: 'Citibank', total: 2100, notificationSent: false },
        { reference: 'BANK-REF-005', date: '2023-05-19', bank: 'HSBC', total: 8900, notificationSent: true }
    ];

    const handleResendEmail = (row) => {
        console.log(`Resend email for ${row.reference}`);
        // Trigger email resend here
    };

    const handleCopy = () => {
        const text = depositsData.map(row =>
            `${row.reference}, ${row.date}, ${row.bank}, ${row.total}, ${row.notificationSent ? 'Yes' : 'No'}`
        ).join('\n');
        navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard'));
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        const content = `
            <html>
            <head><title>${t('deposits')}</title></head>
            <body>
                <h2>${t('deposits')}</h2>
                <table border="1" cellpadding="5" cellspacing="0">
                    <thead>
                        <tr>
                            <th>${t('reference')}</th>
                            <th>${t('deposit_date')}</th>
                            <th>${t('bank_name')}</th>
                            <th>${t('total_value')}</th>
                            <th>${t('notification_sent')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${depositsData.map(row => `
                            <tr>
                                <td>${row.reference}</td>
                                <td>${row.date}</td>
                                <td>${row.bank}</td>
                                <td>${row.total}</td>
                                <td>${row.notificationSent ? t('yes') : t('no')}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
            </html>`;
        printWindow.document.write(content);
        printWindow.document.close();
        printWindow.print();
    };

    const handleExportCSV = () => {
        const header = ['Reference', 'Date', 'Bank Name', 'Total Value', 'Notification Sent'];
        const rows = depositsData.map(row => [
            row.reference,
            row.date,
            row.bank,
            row.total,
            row.notificationSent ? 'Yes' : 'No'
        ]);

        const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'deposits.csv';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                {t('deposits')}
            </Typography>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="outlined" startIcon={<CopyIcon />} onClick={handleCopy}>
                    {t('copy')}
                </Button>
                <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
                    {t('print')}
                </Button>
                <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleExportCSV}>
                    {t('export')}
                </Button>
            </Stack>

            <TableContainer component={Paper} elevation={2}>
                <Table sx={{ minWidth: 650 }} aria-label="deposits table">
                    <TableHead sx={{ bgcolor: 'grey.50' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{t('reference')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{t('deposit_date')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{t('bank_name')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{t('total_value')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{t('notification_sent')}</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'black' }}>{t('resend_email')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {depositsData.map((row) => (
                            <TableRow key={row.reference} hover>
                                <TableCell>{row.reference}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.bank}</TableCell>
                                <TableCell>{row.total}</TableCell>
                                <TableCell>{row.notificationSent ? t('yes') : t('no')}</TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleResendEmail(row)}
                                        disabled={row.notificationSent}
                                    >
                                        <EmailIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Deposit;
