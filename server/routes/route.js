import express from 'express';
import { userSignup,userLogin } from '../controller/user-controller.js';
import { getProducts,getProductById} from '../controller/product-controller.js';
import { enterProduct } from '../controller/entry-controller.js';


const router = express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);
router.post('/seller',enterProduct);

router.get('/products',getProducts);
router.get('/product/:id',getProductById);



export default router;