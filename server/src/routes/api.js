/**
 * Created by Alex on 25.10.2016.
 */
import express from 'express';
import Product from '../models/product';

let router = express.Router();

Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/products');

export default router;