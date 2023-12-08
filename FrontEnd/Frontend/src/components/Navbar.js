import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const location = useLocation();
    let title = 'Code Coverage Tool';

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component={Link} to="/">
                    {title}
                </Typography>
                {location.pathname.includes('coverage-selection') && (
                    <Typography variant="h6">
                        <Link to="/coverage">> Coverage</Link>
                    </Typography>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;