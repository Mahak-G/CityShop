import { Typography, Box, styled } from '@mui/material'; 
import { navData } from '../../constants/data';
import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { useNavigate } from 'react-router-dom';

import {getProducts} from '../../redux/actions/productActions';
const Component = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    margin: '55px 130px 0 130px !important',
    overflowX: 'overlay',
    [theme.breakpoints.down('lg')]: {
        margin: '0px !important'
    }
}))

const Container = styled(Box)`
    padding: 12px 8px;
    text-align: center
`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;

const NavBar = () => {
    const {products} = useSelector(state => state.getProducts);
    //console.log(products);
    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(getProducts())
    }, [dispatch])

    const navigate = useNavigate();
    const handleCategoryClick = (category) => {
        localStorage.setItem('category', category);
        // Navigate to the home page with the selected category as a query parameter
        navigate('/');
    };
    return (
        <Component>
            {
                navData.map(temp => (
                    <Container key={temp.text} onClick={() => handleCategoryClick(temp.text)}>
                        <img src={temp.url} alt={temp.text} style={{ width: 64 }} />
                        <Text>{temp.text}</Text>
                    </Container>
                ))
            }
        </Component>
    )
}
export default NavBar;