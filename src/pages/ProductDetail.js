import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../DATA/products";
import { useCart } from "../context/cartcontext";
import "../view/productdetail.css";


export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return React.createElement("h1", null, "Loading...");
  }

  // check if product is already in cart
  const productInCart = cart.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return React.createElement(
    "div",
    { className: "pages" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "product-detail" },

        // Product Image
        React.createElement("img", {
          src: product.imageUrl || product.image, // fallback if data uses `image`
          alt: product.name,
          className: "product-detail-image",
        }),

        // Product Content
        React.createElement(
          "div",
          { className: "product-detail-content" },
          React.createElement("h1", null, product.name),
          React.createElement(
            "p",
            { className: "product-price" },
            `$${product.price}`
          ),
          React.createElement(
            "p",
            { className: "product-description" },
            product.description
          ),
          React.createElement(
            "button",
            {
              className: "btn btn-primary",
              onClick: () => addToCart(product.id, 1),
            },
            `Add to Cart ${productQuantityLabel}`
          )
        )
      )
    )
  );
}
