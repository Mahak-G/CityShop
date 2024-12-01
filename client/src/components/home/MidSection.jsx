import {  Grid, styled } from '@mui/material';

const ImageURL = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWq04P-CaQC3hb1aLp25w1dcUgx-zapOp3qg&s',
    'https://rukminim1.flixcart.com/flap/960/960/image/084789479074d2b2.jpg',
    'https://rukminim1.flixcart.com/flap/960/960/image/1ce0c4c1fb501b45.jpg?q=50'
];

const Wrapper = styled(Grid)`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`;



const MidSection = () => {
    //const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    return (
        <>
            <Wrapper lg={12} sm={12} md={12} xs={12} container>
                {
                    ImageURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <img src={image} alt="" style={{ width: '100%' }} />
                        </Grid>
                    ))
                }
            </Wrapper>
            
        </>
    )
}

export default MidSection;