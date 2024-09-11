"use client"
import React, {useState} from "react";
import { Box, Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import Navbar from "@/components/Navbar";


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
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
            <Navbar text="SocialNews" />
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontSize: '4rem', fontWeight:'bold', marginTop: "10px"  }}>
                  Welcome to SocialNews!
              </Typography>
              <Typography variant="body1" sx={{ maxWidth: '800px', marginTop: '16px', fontSize: '1.5rem' }}>
                  {data ? data : "Click the button below to get the latest news!"}
              </Typography>
              <Button  variant="contained"  color="primary"  sx={{ marginTop: '24px', fontSize: '1.5rem' }} onClick={accessData}>Get News</Button>
            </Box>
        </Box>
      </div>
  );
}
