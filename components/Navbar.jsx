import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import TemporaryDrawer from './TemporaryDrawer';

export default function Navbar(props) {
    return (
        <AppBar sx={{ backgroundColor: '#388e3c', width: '100%' }}> 
            <Toolbar>
                <TemporaryDrawer />
                <Typography 
                  variant="h6" 
                  component="div" 
                  sx={{ flexGrow: 1, textAlign: 'left', color: '#e8f5e9' }}>  
                    {props.text}
                </Typography>
                <SignedIn>
                    <Button sx={{ color: '#e8f5e9' }}>Sign Out</Button>  
                </SignedIn>
                <SignedOut>
                    <Button 
                      sx={{ color: '#e8f5e9', marginRight: 2 }} 
                      href="sign-in">
                        Sign In
                    </Button>
                    <Button 
                      sx={{ color: '#e8f5e9' }} 
                      href="sign-up">
                        Sign Up
                    </Button>
                </SignedOut>
            </Toolbar>
        </AppBar>
    );
    
}