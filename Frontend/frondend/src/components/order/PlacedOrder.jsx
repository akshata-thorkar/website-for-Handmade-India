import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PlacedOrder.css";

const PlacedOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [productId, setProductId] = useState("");
  const auth = localStorage.getItem('USER');
  const userData = JSON.parse(auth);
  const userId = userData.id;

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  useEffect(() => {
    // Fetch order data for the specific userId from the server
    fetch(`http://localhost:8082/order/orders/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId]); // Changed to use userId directly

  const handleTrackOrder = (orderId) => {
    // Implement tracking logic or navigation to the order tracking page
    console.log(`Track Order clicked for Order ID: ${orderId}`);
  };

  return (
    <div className="placed-order">
      <label>
        Enter Product ID:
        <input type="text" value={productId} onChange={handleInputChange} />
      </label>
      {/* Or use Link for a clickable link */}
      <Link to={`/viewproduct/${productId}`}>View Product</Link>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Product IDs</th>
              <th>Total Amount</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="order-item">
                <td>{order.id}</td>
                <td>{order.userId}</td>
                <td>{order.productIds.join(", ")}</td>
                <td>${order.totalAmount}</td>
                <td>{order.address}</td>
                <td>{order.contactNo}</td>
                <td>
                  <button
                    className="track-order-button"
                    onClick={() => handleTrackOrder(order.id)}
                  >
                    Track Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlacedOrder;
