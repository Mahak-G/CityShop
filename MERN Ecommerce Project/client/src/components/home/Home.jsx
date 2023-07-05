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
        dispatch(getProducts())
    }, [dispatch])

    return(
        <>
            <NavBar />
            <Component>
            <MidSlide products={products} />
            <MidSection />
            <Slide
                products={products} 
                title="Discounts for You"
                timer={false} 
                
            />
            <Slide
                products={products} 
                title='Suggested Items'
                timer={false} 
               
            />
            <Slide
                products={products} 
                title='Top Selection'
                timer={false} 
                
            />
            <Slide
                products={products} 
                title='Recommended Items'
                timer={false} 
                
            />
            </Component>
        </>
    )
}

export default Home;