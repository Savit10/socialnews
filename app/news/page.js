"use client"
import { useState, useEffect } from "react";
import { Typography, Box, Grid, Card, CardActionArea, CardContent} from "@mui/material";

export default function Flashcard() {
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    const handleFlip = (id) => { 
        setFlipped((prev) => (
            { ...prev, [id]: !prev[id]  }
        ))
    }

    return (
        <div>
            <Navbar text={"Flashcard:" + id}/>
            <Box display = {'flex'} flexDirection={'column'} alignItems = {'center'} justifyContent={'center'} gap={3} sx={{marginTop: 2}}>
                {flashcards.length > 0 && 
                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (                  
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea onClick={() => (handleFlip(index))}>
                                        <CardContent>
                                            <Box sx={
                                                {
                                                    perspective: '1000px',
                                                    '& > div': {
                                                        transition: 'transform 0.6s',
                                                        transformStyle: 'preserve-3d',
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: '200px',
                                                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                        transform: flipped[index]? 'rotateY(180deg)': 'rotateY(0deg)',
                                                    }, 
                                                    '& > div > div': {
                                                        position: 'absolute',
                                                        width: '100%',
                                                        height: '100%',
                                                        backfaceVisibility: 'hidden',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        textAlign: 'center',
                                                        padding: 2,
                                                        boxSizing: 'border-box',
                                                    },
                                                    '& > div > div:nth-of-type(2)':{
                                                        transform: 'rotateY(180deg)',
                                                    }
                                                }
                                            }>
                                                <div>
                                                    <div>
                                                        <Typography variant="h5" component="div"> {flashcard.front} </Typography>
                                                    </div>
                                                    <div>
                                                        <Typography variant="h5" component="div"> {flashcard.back} </Typography>
                                                    </div>
                                                </div>                                               
                                            </Box>
                                        </CardContent>
                                        </CardActionArea>
                                </Card>
                            </Grid>
                        ))
                        }
                    </Grid>
                }
                </Box>
        </div>
    )
}