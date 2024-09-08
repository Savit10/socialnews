"use client"
import React, {useState} from "react";
import { Box, Button } from "@mui/material";

export default function Home() {

  const [data, setData] = useState(null);

  const accessData = async () => {
    const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: "Breaking: Mars to Host 2028 Olympics, Says International Olympic Committee"}),
    })
    const data = await response.json();
    console.log(data);
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
