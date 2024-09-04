import {Schema, model} from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    surfaceType: {
        type: String,
        required: true
    },
    shoeHeight: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        required: true
    },
    stock: {
        isAvailable: Boolean,
        required: true
    },
    brand: {
        type: String,   //Nike, Adidas, NB, Puma, etc. logos or names
        required: true
    },
});

const Product = model('Product', productSchema);