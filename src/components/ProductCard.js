import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartcontext";
import "./ProductCard.css"; // CSS for ProductCard

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();

  // find product in cart
  const productInCart = cart.find((item) => item.id === product.id);
  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";

  return React.createElement(
    "div",
    { className: "product-card", key: product.id },
    React.createElement("img", {
      src: product.image,
      alt: product.name,
      className: "product-card-image",
    }),
    React.createElement(
      "div",
      { className: "product-card-content" },
      React.createElement(
        "h3",
        { className: "product-card-name" },
        product.name
      ),
      React.createElement(
        "p",
        { className: "product-card-price" },
        `$${product.price}`
      ),
      React.createElement(
        "div",
        { className: "product-card-actions" },
        React.createElement(
          Link,
          { to: `/products/${product.id}`, className: "btn btn-secondary" },
          "View details"
        ),
        React.createElement(
          "button",
          {
            className: "btn btn-primary",
            onClick: () => addToCart(product.id, 1),
          },
          `Add to cart ${productQuantityLabel}`
        )
      )
    )
  );
}
