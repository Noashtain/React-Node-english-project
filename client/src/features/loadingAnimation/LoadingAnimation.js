import React from 'react';
import { Box, Typography } from '@mui/material';
import { FaSpinner } from 'react-icons/fa';

const LOADING = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      {/* ספינר צבעוני */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '60px',
          height: '60px',
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        <FaSpinner
          size={60}
          color="#9B153B"
          style={{
            animation: 'spin 1s linear infinite',
            position: 'absolute',
          }}
        />
      </Box>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

export default LOADING;