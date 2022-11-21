import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary, Avatar } from '@mui/material';
import { Business, ExpandMore, House } from '@mui/icons-material';
import { roRO } from '@mui/x-data-grid';
import { RouteDefinition, routes } from '../router/routes';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

export default function ResponsiveDrawer(props: any) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <>
            <Toolbar>
                <Avatar sx={{ backgroundColor: 'blueviolet', mr: 1 }}>logo</Avatar>
                <Divider orientation='vertical' flexItem />

                <Box sx={{ display: 'flex', flexDirection: 'column', pl: 1 }}>
                    <Typography variant='body2'>ABV</Typography>
                    <Typography variant='caption'>Motto sau ceva</Typography>
                </Box>

            </Toolbar>

            <Divider />
            <Toolbar sx={{ mt: 2 }}>

                <Avatar>AM</Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'column', pl: 1 }}>
                    <Typography variant='body2'>Adrian Mota</Typography>
                    <Typography variant='caption'>Super user</Typography>
                </Box>

            </Toolbar>
            <List>
                {routes.map((route: RouteDefinition, index: number) => (
                    <>
                        {route.nested ?
                            <Accordion>
                                <AccordionSummary >
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <route.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={route.title} />
                                    </ListItemButton>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Link to={route.path}>
                                        <ListItemButton >
                                            <ListItemText primary={`List ${route.title}`} />
                                        </ListItemButton>
                                    </Link>
                                    {route.nested.map((nestedRoute) => {
                                        return (
                                            <Link to={nestedRoute.path} key={nestedRoute.path}>
                                                <ListItemButton >
                                                    <ListItemText primary={`${nestedRoute.title}`} />
                                                </ListItemButton>
                                            </Link>
                                        )
                                    })}
                                </AccordionDetails>
                            </Accordion>
                            :
                            <Box sx={{ pl: 2 }}>
                                <Link to={route.path}>
                                    <ListItemButton >
                                        <ListItemIcon>
                                            <route.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={route.title} />
                                    </ListItemButton>
                                </Link>
                            </Box>
                        }

                    </>
                ))}
            </List>
            <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end', justifyContent: 'center', mb: 3 }}>
                <Typography variant='caption'>© ABV Ro, Inc. All rights reserved </Typography>
            </Box>
        </>
    );

    return (

        <Box display='flex'>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" noWrap component="div">
                            Current Page

                        </Typography>
                        <Typography variant="caption">
                            ...breadcrumbs
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, height: '100%' }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        height: '100%',
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{ flexGrow: 1, height: { xs: '100vh', md: 'calc(100vh - 60px)' }, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                {props.children}
            </Box>

        </Box>

    );
}
