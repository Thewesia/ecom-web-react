import React from "react";
import { useCart } from "../context/CartContext";
import "../view/checkout.css";

export default function Checkout() {
  const {
    cart,
    removeFromCart,
    clearCart,
    updateQuantity,
    getCartItemsWithProducts,
    getTotalAmount,
    placeOrder,
  } = useCart();

  const cartItems = getCartItemsWithProducts();

  return React.createElement(
    "div",
    { className: "page checkout-page" },
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("h1", { className: "page-title" }, "Checkout"),

      cartItems.length === 0
        ? React.createElement(
            "p",
            { className: "empty-cart" },
            "Your cart is empty."
          )
        : React.createElement(
            React.Fragment,
            null,

            // Cart Items
            React.createElement(
              "div",
              { className: "cart-items" },
              cartItems.map((item) =>
                React.createElement(
                  "div",
                  { key: item.id, className: "cart-item" },
                  React.createElement("img", {
                    src: item.product.image,
                    alt: item.product.name,
                    className: "cart-item-image",
                  }),
                  React.createElement(
                    "div",
                    { className: "cart-item-details" },
                    React.createElement(
                      "h3",
                      { className: "cart-item-name" },
                      item.product.name
                    ),
                    React.createElement(
                      "p",
                      { className: "cart-item-price" },
                      `$${item.product.price}`
                    ),
                    React.createElement(
                      "div",
                      { className: "cart-item-quantity" },
                      React.createElement("label", null, "Quantity: "),
                      React.createElement("input", {
                        type: "number",
                        min: 1,
                        value: item.quantity,
                        onChange: (e) =>
                          updateQuantity(item.id, Number(e.target.value)),
                      })
                    ),
                    React.createElement(
                      "button",
                      {
                        className: "btn btn-secondary",
                        onClick: () => removeFromCart(item.id),
                      },
                      "Remove"
                    )
                  )
                )
              )
            ),

            // Cart Summary
            React.createElement(
              "div",
              { className: "cart-summary" },
              React.createElement(
                "h2",
                null,
                `Total: $${getTotalAmount().toFixed(2)}`
              ),
              React.createElement(
                "div",
                { className: "cart-actions" },
                React.createElement(
                  "button",
                  { className: "btn btn-danger", onClick: clearCart },
                  "Clear Cart"
                ),
                React.createElement(
                  "button",
                  { className: "btn btn-primary", onClick: placeOrder },
                  "Place Order"
                )
              )
            )
          )
    )
  );
}
