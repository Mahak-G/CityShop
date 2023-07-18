import React, { useState, useEffect } from 'react';
import { Box, Typography,TextField, Button, Grid, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {authenticateDetails} from '../../service/api';
const Component = styled(Grid)(({ theme }) => ({
    padding: '30px 350px',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
        marginBottom: 15
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;

const SellerButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 51px;
    width: 250px;
    border-radius: 2px;
`;
const Image = styled(Box)`
    background: #3d2b1f;
    width: 30%;
    height: 90%;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;
const BottomWrapper = styled(Box)`
    
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
    font-size: 5px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 15px;
    }
`;

const productInitialValues = {
    id: '',
    url: '',
    detailUrl: '',
    shortTitle: '',
    longTitle: '',
    mrp: '',
    cost:'',
    discount: '',
    quantity: '',
    description: '',
    discount_tag: '',
    tagline: '',
};

const SellerDialog = () => {
    const navigate = useNavigate();
    const [ newproduct, setProduct ] = useState(productInitialValues);

    const onInputChange = (e) => {
        setProduct({ ...newproduct, [e.target.name]: e.target.value });
    }
    const enterProduct = async() => {
        let response = await authenticateDetails(newproduct);//api call
        if(!response) return;
        navigate('/successful');
    }
    return(
        <Component>
            <Header>
                <Box style={{display: 'flex',height: '100%'}}>
                    <Image>
                        <Typography variant="h5">Become a Seller</Typography>
                        <Typography style={{marginTop: 20}}>Add Your Product Details</Typography>
                    </Image>
                    <BottomWrapper>
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='id' label='Enter Id' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='url' label='Enter Short Image URL' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='detailUrl' label='Enter Long Image URL' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='shortTitle' label='Enter Category' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='longTitle' label='Enter Title' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='mrp' label='Enter Mrp' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='cost' label='Enter Cost' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='discount' label='Enter Discount' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='quantity' label='Enter Quantity' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='description' label='Enter Description' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='discount_tag' label='Enter Discount Tagline' />
                        <TextField variant="standard" size="small" onChange={(e) => onInputChange(e)} name='tagline' label='Enter Tagline' />
                        <SellerButton onClick={() => enterProduct()}>Submit</SellerButton>
                    </BottomWrapper>
                </Box>
            </Header>
        </Component>
    )
}

export default SellerDialog;