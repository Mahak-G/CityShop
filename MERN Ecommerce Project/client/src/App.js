
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import Header from './components/header/Header';
import Home from './components/home/Home';
import DataProvider from './context/DataProvider';
import { Box} from "@mui/material";
import DetailView from './components/details/DetailView';
import SellerDialog from  './components/seller/SellerDialog';
import Cart from './components/Cart/Cart';
import SuccessEntry from './components/seller/Successful';
import SuccessPayment from './components/payment/Success';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header />
          <Box  style={{marginTop: 64}}>
            
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/cart' element={<Cart />} />
              <Route path='/seller' element={<SellerDialog/>} />
              <Route path= '/product/:id' element={<DetailView />} />
              <Route path="/success" element={<SuccessPayment />} />
              <Route path="/successful" element={<SuccessEntry/>}/>
            </Routes>
            
          </Box>
        
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
