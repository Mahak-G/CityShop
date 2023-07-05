import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';

dotenv.config();
const app=express();


app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',Router);

const PORT= 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cityshop.29n6gdc.mongodb.net/?retryWrites=true&w=majority`;


Connection(URL);


app.listen(PORT,() => console.log('server running'));

DefaultData();

app.post("/api/create-checkout-session", async (req, res) => { 
    const line_items=req.body.cartItems.map((Item) => {
        return {
            price_data: { 
                currency: "inr", 
                product_data: { 
                  name: Item.title.longTitle, 
                  images: [Item.url],
                }, 
                unit_amount: ((Item.price.cost)+40) * 100, 
              }, 
              quantity: 1, 
        };
    });
    
    const session = await stripe.checkout.sessions.create({ 
        shipping_address_collection: {
            allowed_countries: ["IN"],
        },
        shipping_options: [
        {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                    amount: 0,
                    currency: 'inr',
                },
                display_name: 'Free Shipping only delivery charges: 40',
                delivery_estimate: {
                    minimum: {
                        unit: 'business_day',
                        value: 5,
                    },
                    maximum: {
                        unit: 'business_day',
                        value: 7,
                    },
                }
            }
        },
        {
            shipping_rate_data: {
                type:'fixed_amount',
                fixed_amount: {
                    amount: 1500,
                    currency: 'inr',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                    minimum: {
                        unit: 'business_day',
                        value: 1,
                    },
                    maximum: {
                        unit: 'business_day',
                        value: 1,
                    },
                }
            }
        },
        ],
        line_items,
        phone_number_collection:{
            enabled: true,
        },
        mode: "payment", 
        success_url: "http://localhost:3000/success", 
        cancel_url: "http://localhost:3000/cart", 
  }); 
  res.send({url: session.url}); 
});
