import React, { useState } from 'react';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Button, MenuItem, Select, Pagination } from '@mui/material';
import { Add, Print, FileCopy, FileDownload } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const ProductsLinks = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h6">{t('products.links')}</Typography>
      <IconButton color="primary"><Add />{t('createProductLink')}</IconButton>
      
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('nameEnglish')}</TableCell>
              <TableCell>{t('nameArabic')}</TableCell>
              <TableCell>{t('englishUrl')}</TableCell>
              <TableCell>{t('arabicUrl')}</TableCell>
              <TableCell>{t('status')}</TableCell>
              <TableCell>{t('actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Add rows dynamically here */}
            <TableRow>
              <TableCell>Product A</TableCell>
              <TableCell>منتج أ</TableCell>
              <TableCell>www.example.com/en</TableCell>
              <TableCell>www.example.com/ar</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>
                <IconButton><FileCopy /></IconButton>
                <IconButton><Print /></IconButton>
                <IconButton><FileDownload /></IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={10} page={page} onChange={handlePageChange} />
    </Box>
  );
};

export default ProductsLinks;
