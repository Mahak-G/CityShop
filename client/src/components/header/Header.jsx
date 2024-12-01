
import { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { Height, Menu } from '@mui/icons-material';

import Search from './Search';
import CustomButton from './CustomButton';
import img from '../../img2.png'
const StyledHeader = styled(AppBar)`
    background: #000000;
    height: 65px;
`;

const Component = styled(Link)`
    margin-left: 12%;
    line-height: 0;
    color: #FFFFFF;
    text-decoration: none;
`;
const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const Header = () =>{

const logourl=img;
const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButton />
                </listItem>
            </List>
        </Box>
    );
    
return(
        <StyledHeader>
            <Toolbar>
                <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
                <Component to='/'>
                    <img src={logourl} alt="logo" style={{width: 140,height: 60}} />
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButton />
                </CustomButtonWrapper>
            </Toolbar>  
        </StyledHeader>
    )
}

export default Header;