import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // שימוש בנושא הקיים

const Footer = () => {
  const theme = useTheme(); // גישה לנושא הקיים

  return (
    <Box
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: theme.palette.primary.main, // צבע הטקסט לפי הנושא
        borderTop: `2px solid ${theme.palette.primary.main}`, // גבול עליון בצבע הנושא
        position: 'fixed',
        bottom: 0,
        height: '5vh',
        zIndex: 1000,
        boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // צל עדין לחלק התחתון
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px', // רווח אחיד בין האלמנטים
          marginBottom: '10px',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.primary.main,
            textAlign: 'center',
          }}
        >
        </Typography>
        <Link
          href="mailto:golda.z2030@gmail.com?subject=Contact from Website&body=Hello Goldi,"
          sx={{
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
אפיון ועיצוב: שבי שווימער | בניה: גולדה זוסמן        </Link>
      </Box>
    </Box>
  );
}

export default Footer;