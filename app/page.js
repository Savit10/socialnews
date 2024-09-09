"use client"
import React, {useState} from "react";
import { Box, Button } from "@mui/material";

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
    <Box  width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Button variant="contained" color="primary" onClick={accessData}> Generate Text </Button>
      <Box>
        {data && <p>{data}</p>}
      </Box>
    </Box>
  );
}
