import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const ScrollToTop = () => {
    const [visible, setVisible] = useState(false)
    const toggleVisibility = () => {
        if (window.scrollY > 200) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])
    return (
        <Box>{
            visible &&
            <IconButton onClick={scrollTop} 
                sx={{ 
                    position: 'fixed', 
                    bottom: 0, 
                    right: 10, 
                    mr: 1, 
                    mb: 1, 
                    color: '#FFC107 ' ,
                    bgcolor:'rgba(67, 66, 62, 0.23)',
                    backdropFilter:'blur(4px)'
                }}>
                <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
            </IconButton>
        }
        </Box>

    )
}

export default ScrollToTop