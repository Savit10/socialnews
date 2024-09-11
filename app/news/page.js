"use client"
import { useState, useEffect } from "react";
import { Typography, Box, Grid, Card, CardActionArea, CardContent} from "@mui/material";
import MultiSelect from "@/components/MultiSelect";
import Navbar from "@/components/Navbar";
import Button from '@mui/material/Button';

export default function News() {
    const [personName, setPersonName] = useState([]);

    const getSummary = async () => {
        try {
            const response = await fetch('http://localhost:8000/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: personName }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const handleCallBack = (childData) => {
        setPersonName(childData);
    }

    return (
        <div>
            <Navbar text={"Flashcard"}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: '#e8f5e9', minHeight: '100vh' }}>
                <MultiSelect callback = {handleCallBack}/>
                <Button variant="contained" sx={{
                        backgroundColor: '#2e7d32', 
                        color: '#fff',
                        borderRadius: '50px',
                        fontSize: '1rem',
                        padding: '10px 30px',
                        marginLeft: '20px',
                        '&:hover': {
                        backgroundColor: '#1b5e20', 
                        },
                }} onClick={getSummary} > Generate </Button>
            </Box>
        </div>
    )
}