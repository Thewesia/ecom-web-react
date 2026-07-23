import React from "react";
import { getProducts } from "../DATA/products";
import ProductCard from "../components/productcard";
import "../view/home.css";

export default function Home() {
  const products = getProducts();

  return React.createElement(
    "div",
    { className: "page" },
    React.createElement(
      "div",
      { className: "home-hero" },
      React.createElement("h1", { className: "home-title" }, "Welcome to shophub"),
      React.createElement(
        "p",
        { className: "subtitle" },
        "Browse the latest tech and accessories"
      )
    ),
    React.createElement(
      "div",
      { className: "container" },
      React.createElement("h2", { className: "page-title" }, "Our Products"),
      React.createElement(
        "p",
        { className: "subtitle" },
        "Hand‑picked items just for you"
      ),
      React.createElement(
        "div",
        { className: "product-grid" },
        products.map((product) =>
          React.createElement(ProductCard, { product: product, key: product.id })
        )
      )
    )
  );
}
