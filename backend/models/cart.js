import { Schema, model } from 'mongoose';


const CartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    image: String,
    size: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = model('Cart', CartSchema);

export default Cart;