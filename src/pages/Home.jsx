import { getProducts } from "../DATA/products";
import ProductCard from "../components/ProductCard";

/**
 * Renders the shop home page with promotional content and product listings.
 * @returns {JSX.Element} The home page content.
 */
export default function Home() {
  const products = getProducts();

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to.-.My React Shop</h1>
        <p className="subtitle">
          Browse the latest tech and accessories
        </p>
      </div>

      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <p className="subtitle">Hand‑picked items just for you</p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id}/>
          ))}
        </div>
      </div>
    </div>
  );
}
