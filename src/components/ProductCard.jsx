import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ import useCart

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart(); // ✅ get cart + addToCart

  // ✅ find product in cart
  const productInCart = cart.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="product-card" key={product.id}>
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/products/${product.id}`} className="btn btn-secondary">
            View details
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product.id, 1)}
          >
            Add to cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
