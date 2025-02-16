import { Box } from '@mui/material';
import React from 'react';

const MainPage = () => {
  return (
    <Box
      sx={{
        marginTop:'1rem',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      //  backgroundColor: '#f3f3e9', // Background color to match your theme
        textAlign: 'center',
      }}
    >
      <img 
        src='/logo.png' 
        alt='Logo' 
        style={{
          width: '40%', 
          maxWidth: '400px', 
          marginBottom: '1rem'
        }} 
      />
    </Box>
  );
};

export default MainPage;
