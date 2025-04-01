import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const itemCost = parseFloat(item.cost.substring(1)); // Convert cost string to number
      total += item.quantity * itemCost; // Multiply quantity by cost and add to total
    });
    return total.toFixed(2); // Return total rounded to 2 decimal places
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e); // Call the function passed from the parent component
  };

  const handleCheckoutShopping = () => {
    alert("Checkout functionality will be added later."); // Placeholder for future implementation
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increase quantity by 1
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrease quantity by 1
    } else {
      dispatch(removeItem(item.name)); // Remove item if quantity drops to 0
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name)); // Dispatch action to remove item from the cart
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const itemCost = parseFloat(item.cost.substring(1)); // Convert cost string to number
    return (item.quantity * itemCost).toFixed(2); // Multiply quantity by cost and return subtotal
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


