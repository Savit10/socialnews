"use client"
import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Navbar from "@/components/Navbar";
import Image from 'next/image';
import laptopImg from './laptop.jpg';
import newspaperImg from './newspaper.jpg';
import { Grid } from '@mui/material';

export default function Home() {

  const [data, setData] = useState(null);

  const accessData = async () => {
    try {
      const response = await fetch('http://localhost:8000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: "Breaking: Mars to Host 2028 Olympics, Says International Olympic Committee"
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      setData(data.summary);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#e8f5e9', // Light Green Background
          minHeight: '100vh', 
        }}
      >
        <Navbar text="HeadlineHub" />
        <Box>
          <Typography
            variant="h1"
            gutterBottom
            sx={{ fontSize: '6rem', fontWeight: 'bold', marginTop: '10px', color: '#1b5e20' }} 
          >
            HEADLINEHUB
          </Typography>
  
          <Typography
            variant="h4"
            sx={{ fontSize: '2.8rem', fontWeight: 'medium', marginBottom: '20px', color: '#388e3c' }} 
          >
            STAY INFORMED, STAY AHEAD
          </Typography>
  
          <Image
            src={newspaperImg}
            alt="Newspaper"
            width={300}
            height={200}
            style={{ borderRadius: '10px', marginBottom: '0px' }}
          />
  
          <Grid container spacing={3} sx={{ marginTop: '20px' }}>
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#c8e6c9', 
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>  
                  Politics
                </Typography>
              </Box>
            </Grid>
  
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#c8e6c9',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}> 
                  Business
                </Typography>
              </Box>
            </Grid>
  
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#c8e6c9', 
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>  
                  Sports
                </Typography>
              </Box>
            </Grid>
  
            <Grid item xs={3}>
              <Box
                sx={{
                  padding: '20px',
                  backgroundColor: '#c8e6c9',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1b5e20' }}>  
                  Health
                </Typography>
              </Box>
            </Grid>
          </Grid>
  
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '24px',
              padding: '10px',
              maxWidth: '800px',
              borderRadius: '50px',
              backgroundColor: '#c8e6c9', 
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="body1"
              sx={{ flexGrow: 1, paddingLeft: '20px', fontSize: '1.5rem', color: '#1b5e20' }}  
            >
              Click on the button to get started
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2e7d32', 
                color: '#fff',
                borderRadius: '50px',
                fontSize: '1rem',
                padding: '10px 30px',
                marginLeft: '20px',
                '&:hover': {
                  backgroundColor: '#1b5e20', 
                },
              }}
              onClick={accessData}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
   
}
