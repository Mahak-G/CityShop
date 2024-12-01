import { Button, Divider, Box, Typography, styled, Grid } from '@mui/material';
import React from 'react';
import Countdown from 'react-countdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;
    padding: 15px;
    align-items: center;

    @media (max-width: 360px) {
        flex-direction: column;
        text-align: center;
    }
`;

const DealText = styled(Typography)`
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
    margin-right: 15px;

    @media (max-width: 360px) {
        font-size: 16px;
        margin-right: 0;
    }
`;

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;

    @media (max-width: 360px) {
        margin: 5px 0;
    }
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: black;
    border-radius: 2px;
    font-size: 12px;

    @media (max-width: 360px) {
        font-size: 10px;
        margin: 5px 0;
    }
`;

const Image = styled('img')({
    width: 'auto',
    height: 150,

    '@media (max-width: 600px)': {
        height: 100,
    }
});

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px;

    @media (max-width: 600px) {
        font-size: 12px;
    }
`;

const RenderTimer = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const Slide = ({ products, title, timer }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

    const renderer = ({ hours, minutes, seconds }) => {
        return <RenderTimer variant="span">{hours} : {minutes} : {seconds} Left</RenderTimer>;
    };
    
    const storedLocation = localStorage.getItem('shoplocation');
    const storedCategory = localStorage.getItem('category'); // Assuming this is set somewhere

    // Filter products based on location and/or category
    const filteredProducts = products.filter(product => {
        const matchesLocation = storedLocation ? product.area === storedLocation : true; // Filter by location if set
        const matchesCategory = storedCategory ? product.category === storedCategory : true; // Filter by category if set
        return matchesLocation && matchesCategory; // Return true only if both match
    });

    // Extract unique shops from filtered products
    const uniqueShops = [...new Map(filteredProducts.map(product => [product.shopname, product])).values()];


    const navigate = useNavigate();
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {timer && (
                    <Timer>
                        <img src={timerURL} style={{ width: 24 }} alt='time clock' />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                    </Timer>
                )}
                
            </Deal>
            <Divider />
            <Grid container spacing={2} style={{ padding: '15px' }}>
    {uniqueShops.map(product => (
        <Grid item xs={12} sm={6} md={3} key={product.shopid}>
            {/* Using an onClick event to handle navigation and localStorage */}
            <a 
                href="#" 
                onClick={(e) => {
                    e.preventDefault(); // Prevent the default anchor behavior
                    localStorage.setItem('shopname', product.shopid); // Store shop name in localStorage
                    navigate(`/shop`); // Navigate to /shop
                }}
                style={{ textDecoration: 'none' }}
            >
                <Box textAlign="center">
                    <Image src={product.url} alt="product" />
                    <Text style={{ fontWeight: 600, color: '#212121' }}>{product.shopname}</Text>
                    <Text style={{ color: 'green' }}>{product.area}</Text>
                    <Text style={{ color: '#212121', opacity: '.6' }}>{product.contact}</Text>
                </Box>
            </a>
        </Grid>
    ))}
</Grid>
        </Component>
    );
};

export default Slide;
