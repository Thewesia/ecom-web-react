import React, { createContext, useState, useContext } from "react";
import { getProductById } from "../DATA/products";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (id, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { id, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getCartItemsWithProducts = () => {
    return cart.map((item) => {
      const product = getProductById(item.id);
      return { ...item, product };
    });
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => {
      const product = getProductById(item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }
    alert("✅ Order placed successfully!");
    clearCart(); // empty cart after placing order
  };

  return React.createElement(
    CartContext.Provider,
    {
      value: {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartItemsWithProducts,
        getTotalAmount,
        placeOrder,
      },
    },
    children
  );
};

export const useCart = () => useContext(CartContext);
