import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SellerProducts.css"; // Import your CSS file for styling

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const auth = localStorage.getItem("USER");
  const userData = JSON.parse(auth);

  // Fetch user-specific products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const ownerid = userData.id;

        // Replace the URL with your actual backend endpoint for fetching user products
        const response = await fetch(`http://localhost:8082/product/products/byOwner/${ownerid}`);
        const data = await response.json();

        // Update the state with the fetched products
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [userData.id]); // Trigger the effect whenever userData.id changes

  return (
    <div className="seller-products">
      <h2>Your Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-row">
            <div className="product-info">
              <p>Product ID: {product.id}</p>
              {product.image && (
                <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
              )}
              <p>Product Name: {product.productName}</p>
            </div>
            <div className="product-actions">
              <Link to={`/viewproduct/${product.id}`}>View Product</Link>
              <p>Status: {product.status} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerProducts;
