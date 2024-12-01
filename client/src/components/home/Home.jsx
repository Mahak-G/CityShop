import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'; // hooks
import { Box, styled } from '@mui/material';

import NavBar from './NavBar';
import {getProducts} from '../../redux/actions/productActions';
import MidSlide from './MidSlide';
import MidSection from './MidSection';
import Slide from './slide';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
`;
const Home= () =>{
    const {products} = useSelector(state => state.getProducts);
    //console.log(products);
    const dispatch = useDispatch();

    useEffect(() => {
        localStorage.removeItem('shopname');
        localStorage.removeItem('shoplocation');
        localStorage.removeItem('category');
        localStorage.removeItem('invoiceData');
        dispatch(getProducts())
    }, [dispatch])

    return(
        <>
            <NavBar />
            <Component>
            <MidSlide products={products} />
            
            
            
            
            </Component>
        </>
    )
}

export default Home;