/**
 * Created by Alex on 25.10.2016.
 */

import restful from 'node-restful';

let mongoose = restful.mongoose;

let productSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number
});

export default restful.model('Products', productSchema);