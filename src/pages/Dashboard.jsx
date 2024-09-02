import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
      <h1>Кандай, э, Азиат!</h1>
      <Button variant="contained" color="primary" onClick={handleBack}>
        Ок, молодец!
      </Button>
    </Box>
  );
};

export default Dashboard;
