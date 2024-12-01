import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Grid, styled, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authenticateDetails } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    padding: '30px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
}));

const FormWrapper = styled(Paper)(({ theme }) => ({
    padding: '40px',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

const Header = styled(Box)`
    text-align: center;
    margin-bottom: 20px;
`;

const StyledButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    marginTop: '20px',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: '20px',
}));

const productInitialValues = {
    id: '',
    url: '',
    detailUrl: '',
    shortTitle: '',
    longTitle: '',
    mrp: '',
    cost: '',
    discount: '',
    quantity: '',
    description: '',
    discount_tag: '',
    tagline: '',
    shopname: '',
    area: '',
    category: '',
    contact: '',
    shopid: '',
};

const SellerDialog = () => {
    const navigate = useNavigate();
    const [newProduct, setProduct] = useState(productInitialValues);

    const onInputChange = (e) => {
        setProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const enterProduct = async () => {
        const response = await authenticateDetails(newProduct); // API call
        if (!response) return;
        navigate('/successful');
    };

    return (
        <Container>
            <FormWrapper elevation={3}>
                <Header>
                    <Typography variant="h5" fontWeight="bold">
                        Become a Seller
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Add Your Product Details
                    </Typography>
                </Header>
                <Grid container spacing={2}>
                    {Object.keys(productInitialValues).map((field) => (
                        <Grid item xs={12} sm={6} key={field}>
                            <StyledTextField
                                fullWidth
                                variant="outlined"
                                size="small"
                                name={field}
                                label={`Enter ${field.replace(/([a-z])([A-Z])/g, '$1 $2')}`}
                                onChange={onInputChange}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box textAlign="center">
                    <StyledButton onClick={enterProduct}>Submit</StyledButton>
                </Box>
            </FormWrapper>
        </Container>
    );
};

export default SellerDialog;
