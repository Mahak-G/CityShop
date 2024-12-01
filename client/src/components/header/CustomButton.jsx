import {useState,useContext,useEffect} from 'react';
import { Box,Button,Badge,Typography,styled, Menu, MenuItem, } from "@mui/material";
import { ShoppingCart } from '@mui/icons-material';
import {Datacontext} from '../../context/DataProvider';
import Profile from './Profile';
import LoginDialog from '../login/LoginDialog';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getProducts} from '../../redux/actions/productActions';


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
const SellerButton = styled(Button)(({ theme }) => ({
    marginRight: 10, 
    color: 'white', 
    background: 'black',
    [theme.breakpoints.down('sm')]: {
        background: 'white',
        color: 'black',
        fontWeight: 600,
        marginLeft: 30
    }
}));
const LocationTypography = styled(Typography)(({ theme }) => ({
    cursor: 'pointer',
    color: '#ffffff',
    textDecoration: 'none',
    marginTop: 5,
    marginRight: 20,
    fontSize: '16px',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
        background: 'white',
        color: 'black'
    }
}));
const CartBadge = styled(Badge)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        background: 'white',
        color: 'black', 
        marginRight: 80
    }
}));
const CartButton = styled(Button)(({ theme }) => ({
    marginRight: 10, color: 'white', background: 'black',
    [theme.breakpoints.down('sm')]: {
        background: 'white',
        color: 'black',
        marginRight: 80
    }
}));

const CustomButton = () =>{
    const [location, setLocation] = useState(localStorage.getItem('shoplocation') || ''); // initialize with stored value if available

    
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [open,setOpen]=useState(false);

    const {account,setAccount} = useContext(Datacontext);
    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const openDialog = () => {
        setOpen(true);
    }
    const openSeller = () => {
        navigate('/seller');
    }
    const toCart = () => {
        navigate('/cart');
    }
    
    const {products} = useSelector(state => state.getProducts);
    //console.log(products);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedLocation = localStorage.getItem('shoplocation');

        if (storedLocation) {
            setLocation(storedLocation); // Set location if found
        } else {
            setLocation(''); // Reset location if not found
        }
        dispatch(getProducts())
    }, [dispatch])

    const uniqueLocations = Array.from(new Set(products?.map(product => product.area)));
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Close the menu and set location
    const handleClose = (selectedLocation) => {
        setAnchorEl(null);
        if (selectedLocation) setLocation(selectedLocation);
         // Set location to the selected value
        console.log(location);
        localStorage.setItem('shoplocation', selectedLocation);
        navigate('/');
    };

    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton  onClick={() => openDialog()}> Login</LoginButton> 
            }
            <SellerButton onClick={() => openSeller()} >Seller</SellerButton>
            
            <LocationTypography
                onClick={handleClick}
                
            >
                {location || 'Location'}
            </LocationTypography>
            <Menu
                id="location-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleClose(null)}
                PaperProps={{
                    style: {
                        maxHeight: 200,  // Limit menu height
                        width: '150px',  // Adjust menu width to be more compact
                        backgroundColor: '#333',
                        color: '#fff'
                    }
                }}
            >
                {uniqueLocations.map((area) => (
                    <MenuItem
                        key={area}
                        onClick={() => handleClose(area)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                        {area}
                    </MenuItem>
                ))}
            </Menu>
            <Container to='/cart'>
                <CartBadge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </CartBadge>
                <CartButton onClick={() => toCart()}  >Cart</CartButton>
            </Container> 
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount}/>
        </Wrapper>
    )
}

export default CustomButton;
