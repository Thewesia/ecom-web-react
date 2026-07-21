// Checkout.jsx
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { 
    getCartItemsWithProducts, 
    removeFromCart, 
    clearCart, 
    updateQuantity, 
    getTotalAmount,
    placeOrder // ✅ include placeOrder
  } = useCart();

  const cartItems = getCartItemsWithProducts();
  const totalPrice = getTotalAmount();

  if (cartItems.length === 0) {
    return (
      <div className="pages">
        <div className="container">
          <h1>Your cart is empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="pages">
      <div className="container">
        <h1>Checkout</h1>
        <div className="checkout-items">
          {cartItems.map(({ id, quantity, product }) => {
            if (!product) return null;

            return (
              <div key={id} className="checkout-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-content">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>
                    Quantity: {quantity}
                    <button
                      className="btn btn-small"
                      onClick={() => updateQuantity(id, quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-small"
                      onClick={() => updateQuantity(id, quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                  </p>
                  <p>Subtotal: ${product.price * quantity}</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="checkout-summary">
          <h2>Total: ${totalPrice}</h2>
          <button className="btn btn-danger" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="btn btn-primary" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
