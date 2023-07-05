import React from "react"; 
import { Button,styled } from '@mui/material';

import axios from 'axios';
const URL= 'https://cityshop-dl21.onrender.com';

const StyledButton = styled(Button)`
    
    display: flex;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const PaymentCart = ({cartItems}) => {
    
    const makePayment = () =>{
        
        axios.post(`${URL}/api/create-checkout-session`, {
            cartItems
        }).then((res) => {
            if(res.data.url){
                window.location.href=res.data.url
            }
        }).catch((err) => console.log(err.message));
    };
    return (
        <StyledButton onClick={() => makePayment()} variant="contained">Place Order</StyledButton>
    );
}

export default PaymentCart;
