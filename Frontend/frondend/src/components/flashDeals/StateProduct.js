import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Import your CSS file for styling

const StateProductList = ({ stateName }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products based on the provided stateName
    fetch(`http://localhost:8082/product/products?state=${stateName}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [stateName]);

  return (
    <div>
      <h2> 🛍️ Products in {stateName} </h2>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="product-list">
        {products
          .filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <Link to={`/viewproduct/${product.id}`} key={product.id}>
              <div className="product-card">
                {/* Assuming "image" property is available in your product data */}
                <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
                <p>{product.productName}</p>
                <p>Category: {product.category}</p>
                <p>State: {product.state}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default StateProductList;
