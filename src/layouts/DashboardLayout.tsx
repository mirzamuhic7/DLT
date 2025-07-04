import { Outlet, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const menu = [{ label: 'Turneringar', to: '/tournaments' }];

export default function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='fixed' color='inherit' elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant='h6' fontWeight={700} color='primary.main'>
            DLT-portal
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant='permanent' sx={{ width: 220, '& .MuiDrawer-paper': { width: 220, mt: 8 } }}>
        <List>
          {menu.map(m => (
            <ListItem disablePadding key={m.to}>
              <ListItemButton component={NavLink} to={m.to} sx={{ '&.active': { bgcolor: 'action.selected' } }}>
                <ListItemText primary={m.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8, ml: 28 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
