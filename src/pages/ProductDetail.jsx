import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../DATA/products";

export default function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // if product not found, redirect or keep loading
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>; // ✅ show loading until product is set
  }

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
            <button className="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
