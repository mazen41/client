import React, { useState } from 'react';
import {
  Box, Typography, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, TablePagination, Button, Select, MenuItem
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const productData = [...Array(20).keys()].map(i => ({
  nameEn: `Product ${i + 1}`,
  nameAr: `المنتج ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books'][i % 3],
  price: (Math.random() * 100).toFixed(2),
  quantity: Math.floor(Math.random() * 100),
  status: i % 2 === 0 ? 'In Stock' : 'Out of Stock',
  stockable: i % 2 === 0
}));

const Products = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const filtered = productData.filter(item =>
    item.nameEn.toLowerCase().includes(search.toLowerCase()) &&
    (stockFilter === '' || (stockFilter === 'stockable' && item.stockable) || (stockFilter === 'non-stockable' && !item.stockable))
  );

  return (
    <Box sx={{ padding: 3, direction: i18n.language === 'ar' ? 'rtl' : 'ltr' }}>
      <Typography variant="h5" gutterBottom>
        {t('products.title', 'Products')}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label={t('search', 'Search')}
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">{t('all', 'All')}</MenuItem>
          <MenuItem value="stockable">{t('stockable', 'Stockable')}</MenuItem>
          <MenuItem value="non-stockable">{t('nonStockable', 'Non-Stockable')}</MenuItem>
        </Select>
        <Button variant="contained" color="primary">
          {t('createOrder', 'Create Order')}
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('nameEn', 'Name (EN)')}</TableCell>
              <TableCell>{t('nameAr', 'Name (AR)')}</TableCell>
              <TableCell>{t('category', 'Category')}</TableCell>
              <TableCell>{t('price', 'Price')}</TableCell>
              <TableCell>{t('quantity', 'Quantity')}</TableCell>
              <TableCell>{t('status', 'Status')}</TableCell>
              <TableCell>{t('actions', 'Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.nameEn}</TableCell>
                <TableCell>{row.nameAr}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <IconButton><VisibilityIcon /></IconButton>
                  <IconButton><EditIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[]}
        />
      </TableContainer>
    </Box>
  );
};

export default Products;
