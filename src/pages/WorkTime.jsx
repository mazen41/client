import React, { useState } from 'react';
import { 
  Box, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Typography, 
  Button, 
  Pagination,
  Paper,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  Tooltip,
  IconButton
} from '@mui/material';
import { 
  Add, 
  Search, 
  Edit, 
  Delete, 
  CheckCircle, 
  Cancel,
  FilterList,
  Refresh,
  MoreVert,
  Schedule
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const WorkTime = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const rowsPerPage = 5;

  // Sample data - replace with your actual data
  const workTimes = [
    { id: 1, day: 'Monday', workTime: '9:00 AM', closeTime: '6:00 PM', shift2OpenTime: '12:00 PM', shift2CloseTime: '4:00 PM', status: 'active' },
    { id: 2, day: 'Tuesday', workTime: '9:00 AM', closeTime: '6:00 PM', shift2OpenTime: '12:00 PM', shift2CloseTime: '4:00 PM', status: 'active' },
    { id: 3, day: 'Wednesday', workTime: '9:00 AM', closeTime: '6:00 PM', shift2OpenTime: '12:00 PM', shift2CloseTime: '4:00 PM', status: 'inactive' },
    { id: 4, day: 'Thursday', workTime: '9:00 AM', closeTime: '6:00 PM', shift2OpenTime: '12:00 PM', shift2CloseTime: '4:00 PM', status: 'active' },
    { id: 5, day: 'Friday', workTime: '10:00 AM', closeTime: '4:00 PM', shift2OpenTime: '1:00 PM', shift2CloseTime: '3:00 PM', status: 'active' },
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredWorkTimes = workTimes.filter(workTime => {
    const matchesSearch = workTime.day.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || workTime.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedWorkTimes = filteredWorkTimes.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Schedule fontSize="large" color="primary" />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {t('workTimePage.title')}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              py: 1,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
              }
            }}
          >
            {t('workTimePage.createWorkTime')}
          </Button>
          
          <Tooltip title={t('workTimePage.refresh')}>
            <IconButton sx={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              bgcolor: 'background.paper'
            }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Filters and Search Section */}
      <Paper sx={{ 
        p: 2, 
        mb: 3, 
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <TextField
            size="small"
            placeholder={t('workTimePage.searchPlaceholder')}
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              sx: { borderRadius: '8px' }
            }}
            sx={{ minWidth: 250 }}
          />
          
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="all">{t('workTimePage.allStatuses')}</MenuItem>
              <MenuItem value="active">{t('workTimePage.active')}</MenuItem>
              <MenuItem value="inactive">{t('workTimePage.inactive')}</MenuItem>
            </Select>
          </FormControl>
          
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ 
              borderRadius: '8px',
              textTransform: 'none',
              ml: 'auto'
            }}
          >
            {t('workTimePage.moreFilters')}
          </Button>
        </Box>
      </Paper>

      {/* Work Times Table */}
      <Paper sx={{ 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
      }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'background.default' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>{t('day')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('workTime')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('closeTime')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('shift2OpenTime')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('shift2CloseTime')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{t('status')}</TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">{t('actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedWorkTimes.length > 0 ? (
                paginatedWorkTimes.map((workTime) => (
                  <TableRow key={workTime.id} hover>
                    <TableCell>{t(`days.${workTime.day.toLowerCase()}`)}</TableCell>
                    <TableCell>{workTime.workTime}</TableCell>
                    <TableCell>{workTime.closeTime}</TableCell>
                    <TableCell>{workTime.shift2OpenTime}</TableCell>
                    <TableCell>{workTime.shift2CloseTime}</TableCell>
                    <TableCell>
                      <Chip
                        label={t(`workTimePage.${workTime.status}`)}
                        color={workTime.status === 'active' ? 'success' : 'error'}
                        size="small"
                        avatar={
                          <Avatar>
                            {workTime.status === 'active' ? (
                              <CheckCircle fontSize="small" />
                            ) : (
                              <Cancel fontSize="small" />
                            )}
                          </Avatar>
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Tooltip title={t('workTimePage.edit')}>
                          <IconButton size="small" color="primary">
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('workTimePage.delete')}>
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <IconButton size="small">
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                    <Typography color="textSecondary">
                      {t('workTimePage.noWorkTimesFound')}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mt: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="body2" color="textSecondary">
          {t('workTimePage.showing')} {(page - 1) * rowsPerPage + 1}-{Math.min(page * rowsPerPage, filteredWorkTimes.length)} {t('workTimePage.of')} {filteredWorkTimes.length} {t('workTimePage.workTimes')}
        </Typography>
        <Pagination
          count={Math.ceil(filteredWorkTimes.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '6px'
            }
          }}
        />
      </Box>

      {/* Create Work Time Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          borderBottom: '1px solid #eee',
          pb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="h6">{t('workTimePage.createWorkTime')}</Typography>
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth size="small">
              <Select
                label={t('day')}
                defaultValue="Monday"
              >
                <MenuItem value="Monday">{t('days.monday')}</MenuItem>
                <MenuItem value="Tuesday">{t('days.tuesday')}</MenuItem>
                <MenuItem value="Wednesday">{t('days.wednesday')}</MenuItem>
                <MenuItem value="Thursday">{t('days.thursday')}</MenuItem>
                <MenuItem value="Friday">{t('days.friday')}</MenuItem>
                <MenuItem value="Saturday">{t('days.saturday')}</MenuItem>
                <MenuItem value="Sunday">{t('days.sunday')}</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              label={t('workTime')}
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              fullWidth
              label={t('closeTime')}
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              fullWidth
              label={t('shift2OpenTime')}
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              fullWidth
              label={t('shift2CloseTime')}
              variant="outlined"
              size="small"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
            
            <FormControl fullWidth size="small">
              <Select
                label={t('status')}
                defaultValue="active"
              >
                <MenuItem value="active">{t('workTimePage.active')}</MenuItem>
                <MenuItem value="inactive">{t('workTimePage.inactive')}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: '1px solid #eee',
          pt: 2,
          px: 3,
          pb: 3
        }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{ borderRadius: '6px' }}
          >
            {t('workTimePage.cancel')}
          </Button>
          <Button 
            variant="contained"
            color="primary"
            sx={{ borderRadius: '6px' }}
          >
            {t('workTimePage.create')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkTime;