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
  Typography
} from '@mui/material';

import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  MedicalServices as MedicalServicesIcon,
  PersonalInjury as PersonalInjuryIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Manage Doctor', icon: <MedicalServicesIcon />, path: '/admin/doctor' },
  { text: 'Manage Patient', icon: <PersonalInjuryIcon />, path: '/admin/patient' },
  { text: 'View Reports', icon: <AssessmentIcon />, path: '/admin/reports' },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: '#007bff' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ color: 'white' }}>
              Admin Dashboard
            </Typography>
          </Box>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                backgroundColor: '#e53935',
                '&:hover': { backgroundColor: '#c62828' }
              }}
            >
              Logout
            </Button>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
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
            background: '#ffffff',
            color: '#1b1f3b',
            boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
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
                    '&.Mui-selected': {
                      backgroundColor: '#e6f0ff',
                      color: '#007bff',
                      fontWeight: 'bold'
                    },
                    '&:hover': { backgroundColor: '#f0f8ff' },
                    borderRadius: 2,
                    margin: '6px 8px',
                    paddingLeft: open ? 3 : 2,
                    transition: '0.2s',
                  }}
                >
                  <ListItemIcon sx={{ color: '#007bff', minWidth: open ? 40 : 'auto' }}>
                    {icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={text} />}
                </ListItem>
              </Tooltip>
            </motion.div>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f4f7fc', minHeight: '100vh' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
