import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Assessment as ViewReportIcon,
  QuestionAnswer as SuggestionIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';

import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const drawerWidth = 240;

const menuItems = [
  { text: 'Doctor Dashboard', icon: <DashboardIcon />, path: '/doctor' },
  { text: 'View Report', icon: <ViewReportIcon />, path: '/doctor/view-report' },
  { text: 'Give Suggestion', icon: <SuggestionIcon />, path: '/doctor/give-suggestion' },
];

const DoctorLayout = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setOpen(!open);
  const handleLogout = () => navigate('/');

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: '#1565c0' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Doctor Dashboard
            </Typography>
          </Box>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                backgroundColor: '#d32f2f',
                '&:hover': { backgroundColor: '#b71c1c' },
              }}
            >
              Logout
            </Button>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 72,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 72,
            transition: '0.3s ease-in-out',
            overflowX: 'hidden',
            background: '#0d47a1',
            color: '#fff',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map(({ text, icon, path }, index) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Tooltip title={!open ? text : ''} placement="right">
                <ListItem
                  button
                  onClick={() => navigate(path)}
                  selected={location.pathname === path}
                  sx={{
                    '&.Mui-selected': { backgroundColor: '#1976d2' },
                    '&:hover': { backgroundColor: '#1565c0' },
                    borderRadius: 2,
                    margin: '6px 8px',
                    paddingLeft: open ? 3 : 2,
                    transition: '0.2s',
                  }}
                >
                  <ListItemIcon sx={{ color: 'white', minWidth: open ? 40 : 'auto' }}>
                    {icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={text} />}
                </ListItem>
              </Tooltip>
            </motion.div>
          ))}
        </List>
      </Drawer>

      {/* Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DoctorLayout;
