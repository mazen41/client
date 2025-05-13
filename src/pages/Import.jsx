import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, RadioGroup, Radio, FormControlLabel, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Import = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleFileChange = (event) => setFile(event.target.files[0]);

  return (
    <Box>
      <Typography variant="h6">{t('import')}</Typography>
      <Select value={category} onChange={handleCategoryChange} fullWidth>
        <MenuItem value="category1">Category 1</MenuItem>
        <MenuItem value="category2">Category 2</MenuItem>
      </Select>
      
      <RadioGroup row value={isActive} onChange={(e) => setIsActive(e.target.value)}>
        <FormControlLabel value={true} control={<Radio />} label={t('active')} />
        <FormControlLabel value={false} control={<Radio />} label={t('inactive')} />
      </RadioGroup>

      <TextField
        type="file"
        fullWidth
        onChange={handleFileChange}
        variant="outlined"
      />

      <Button>{t('create')}</Button>
    </Box>
  );
};

export default Import;
