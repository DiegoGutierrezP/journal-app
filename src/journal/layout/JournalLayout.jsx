import { Box } from '@mui/material'
import React from 'react'
import { NavBar, Sidebar } from '../components';

const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box component='main' sx={{display:'flex'}} className="animate__animated animate__fadeIn animat__faster">
        {/* Navbar */}
        <NavBar drawerWidth={drawerWidth} />
        {/* Sidebar */}
        <Sidebar drawerWidth={drawerWidth} />

        <Box component='main' sx={{flexGrow:1,p:3,pt:9}}>
            {children}
        </Box>
    </Box>
  )
}
