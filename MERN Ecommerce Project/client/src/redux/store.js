import {combineReducers, createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { getProductDetailsReducer, getProductReducer } from './reducers/productReducer.js';
import { getProductDetails } from './actions/productActions.js';
import {cartReducer} from './reducers/cartReducer.js';

const reducer = combineReducers({
    getProducts: getProductReducer,
    getProductDetails: getProductDetailsReducer,
    cart: cartReducer
})
const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;