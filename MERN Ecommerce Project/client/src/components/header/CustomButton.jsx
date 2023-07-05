import {useState,useContext} from 'react';
import { Box,Button,Badge,Typography,styled } from "@mui/material";
import { ShoppingCart } from '@mui/icons-material';
import {Datacontext} from '../../context/DataProvider';
import Profile from './Profile';
import LoginDialog from '../login/LoginDialog';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container =styled(Box)`
    display: flex;
`;
const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    height: 32,
    '& > *': {
        marginRight: '40px !important',
        textDecoration: 'none',
        color: '#FFFFFF',
        fontSize: 12,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            color: 'black',
            alignItems: 'center',
            display:'flex',   
            flexDirection: 'column',
            marginTop: 10,
            fontSize: 12,
        }
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: 'white',
    marginLeft: 5,
    marginRight: '5px !important',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        background: 'white',
        color: 'black'
    }
}));

const CustomButton = () =>{
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);

    const {account,setAccount} = useContext(Datacontext);
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const openDialog = () => {
        setOpen(true);
    }
    const toCart = () => {
        navigate('/cart');
    }

    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton  onClick={() => openDialog()}> Login</LoginButton> 
            }
            
            <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
            <Typography style={{ marginTop: 3 }}>Location</Typography>
            <Container to='/cart'>
                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Button onClick={() => toCart()} style={{marginRight: 10, color: 'white', background: 'black'}} variant="contained">Cart</Button>
            </Container> 
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount}/>
        </Wrapper>
    )
}

export default CustomButton;