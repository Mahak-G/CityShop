import { Button, Divider, Box, Typography, styled, Grid } from '@mui/material';
import React from 'react';
import Countdown from 'react-countdown';
import { Link,useParams } from 'react-router-dom';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks

import {getProducts} from '../../redux/actions/productActions';

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



const SlideView = () => {
    // console.log('hello')
    const {products} = useSelector(state => state.getProducts);
    //console.log(products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    
    const shopname = localStorage.getItem('shopname');

    // Filter products to only include those from the selected shop
    const filteredProducts = products
        ? products.filter(item => item.shopid === shopname)
        : [];

    return (
        <Component>
            <Divider />
            <Grid container spacing={2} style={{ padding: '15px' }}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Link to={`product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <Box textAlign="center">
                                    <Image src={product.detailUrl} alt="product" />
                                    <Text style={{ fontWeight: 600, color: '#212121' }}>{product.shortTitle}</Text>
                                    <Text style={{ color: 'green' }}>{product.discount_tag}</Text>
                                    <Text style={{ color: '#212121', opacity: '.6' }}>{product.tagline}</Text>
                                </Box>
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Text>No products available for this shop.</Text>
                )}
            </Grid>
        </Component>
    );
};

export default SlideView;
