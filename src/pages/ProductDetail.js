import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../DATA/products";
import { useCart } from "../context/CartContext"; // ✅ import useCart

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const { cart, addToCart } = useCart(); // ✅ get cart + addToCart

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>; 
  }

  // ✅ check if product is already in cart
  const productInCart = cart.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return (
    <div className="pages">
      <div className="container">
        <div className="product-detail">
          {/* Product Image */}
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="product-detail-image" 
          />

          {/* Product Content */}
          <div className="product-detail-content">
            <h1>{product.name}</h1>
            <p className="product-price">${product.price}</p>
            <p className="product-description">{product.description}</p>
            <button 
              className="btn btn-primary"
              onClick={() => addToCart(product.id, 1)} // ✅ add to cart
            >
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
