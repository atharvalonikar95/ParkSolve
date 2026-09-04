import React from 'react'
import { Button, Paper, Typography } from '@mui/material'
import { Link,} from 'react-router-dom';

const InfoComp = () => {
    const isSignInPage = window.location.pathname === '/signin';
    return (
        <Paper elevation={3}
            sx={{
                width: '500px',
                height: '60%',
                px: 2,
                border: 'px solid red',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),url('/lpic2.png')`,
                p: 4,
                backgroundSize: 'cover',
                borderRadius: 4,
                elevation: 8
            }} >

            <Typography variant='h4' sx={{ textAlign: 'center', my: 2, fontWeight: 'bold', color: '#b0b2bbd2' }} >
                My Vehicle , My Responsibility
            </Typography>
            <Typography sx={{ color: '#bec0cdd2' }}>
                Parking safely is essential for protecting your vehicle, avoiding unnecessary expenses, and keeping roads clear for everyone. Choosing well-lit, authorized parking spots drastically lowers the risk of vehicle theft, vandalism, and accidental dents or scratches. Proper parking habits—such as staying within marked lines, curbing your wheels on inclines, and never blocking driveways or pedestrian walkways—prevent traffic bottlenecks and protect passing cyclists and walkers.
            </Typography>
            {
                isSignInPage ?
                    (
                        <>
                            <Typography sx={{ mt: 4, color: "#afb1c4d2", }} >
                                Not registed ? lets signup quickly
                            </Typography>
                            <Button
                                component={Link}
                                to="/signup"
                                variant="text"
                                sx={{
                                    width: '80%',
                                    mt: 1.5,
                                    color: 'black',
                                    backgroundColor: '#c79d32',
                                    ":hover": {
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        </>
                    ) :
                    (
                        <>
                            <Typography sx={{ mt: 4, color: "#afb1c4d2", }} >
                                Already Account ? lets signin quickly
                            </Typography>
                            <Button
                                component={Link}
                                to="/signin"
                                variant="text"
                                sx={{
                                    width: '80%',
                                    mt: 1.5,
                                    color: 'black',
                                    backgroundColor: '#c79d32',
                                    ":hover": {
                                        backgroundColor: 'black',
                                        color: 'white'
                                    }
                                }}
                            >
                                Sign In
                            </Button>
                        </>
                    )
            }
        </Paper>
    )
}

export default InfoComp