import { Typography, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    width: 80%%;
    height: 65vh;
    background: #fff;
    margin: 80px 140px;
`;

const Container = styled(Box)`
    text-align: center;
    padding-top: 70px;
`;

const Image = styled('img')({
    width: '15%'
});


const EmptyCart = () => {
    const navigate = useNavigate();
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
    
    const toHome = () => {
        navigate('/');
    }
    return (
        <Component>
            <Container>
                <Image src={imgurl} />
                <Typography>Your cart is empty!</Typography>
                <Typography >Add items to it now.</Typography>
                <homeStyle onClick={() => toHome()} style={{width: 46, marginRight: 10, background: '#ff9f00'}} variant="contained">Home</homeStyle>
            </Container>
            
        </Component>
    )
}

export default EmptyCart;