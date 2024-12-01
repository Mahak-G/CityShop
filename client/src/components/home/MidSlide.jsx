import { Box, styled } from '@mui/material';
import Slide from './slide';

const Component = styled(Box)`
    width: 100%;  
    display: flex;
    justify-content: center;  
`;

const FullWidthSlide = styled(Box)`
    width: 100%;  
`;

const MidSlide = ({ products }) => {
    return (
        <Component>
            <FullWidthSlide>
                <Slide 
                    products={products} 
                    
                />
            </FullWidthSlide>
        </Component>
    );
}

export default MidSlide;
