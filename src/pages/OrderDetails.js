import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTruck, FaCheckCircle, FaClock } from 'react-icons/fa';
import { getOrderById, updateOrderStatus } from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    setLoading(true);
    const data = await getOrderById(id);
    setOrder(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (newStatus) => {
    setUpdating(true);
    await updateOrderStatus(id, newStatus);
    await loadOrder();
    setUpdating(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f57c00',
      confirmed: '#1976d2',
      shipped: '#7b1fa2',
      delivered: '#388e3c',
      cancelled: '#d32f2f'
    };
    return colors[status] || '#f57c00';
  };

  if (loading) return <LoadingSpinner />;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details">
      <button className="back-btn" onClick={() => navigate('/orders')}>
        <FaArrowLeft /> Back to Orders
      </button>

      <div className="order-header">
        <h1>Order #{order.id}</h1>
        <div className="order-status" style={{ background: getStatusColor(order.status) }}>
          {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
        </div>
      </div>

      <div className="order-info-grid">
        <div className="info-card">
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {order.customer?.name}</p>
          <p><strong>Email:</strong> {order.customer?.email}</p>
          <p><strong>Phone:</strong> {order.customer?.phone}</p>
        </div>

        <div className="info-card">
          <h3>Shipping Address</h3>
          <p>{order.shipping?.address1}</p>
          {order.shipping?.address2 && <p>{order.shipping.address2}</p>}
          <p>{order.shipping?.city}, {order.shipping?.state} - {order.shipping?.pincode}</p>
        </div>

        <div className="info-card">
          <h3>Payment Details</h3>
          <p><strong>Method:</strong> {order.payment?.method}</p>
          <p><strong>Status:</strong> {order.payment?.status}</p>
          <p><strong>Subtotal:</strong> ₹{order.payment?.subtotal}</p>
          <p><strong>Shipping:</strong> ₹{order.payment?.shipping}</p>
          <p><strong>Total:</strong> ₹{order.payment?.total}</p>
        </div>

        <div className="info-card">
          <h3>Update Status</h3>
          <div className="status-buttons">
            <button 
              onClick={() => handleStatusUpdate('confirmed')}
              disabled={updating || order.status === 'confirmed'}
            >
              <FaCheckCircle /> Confirm
            </button>
            <button 
              onClick={() => handleStatusUpdate('shipped')}
              disabled={updating || order.status === 'shipped'}
            >
              <FaTruck /> Ship
            </button>
            <button 
              onClick={() => handleStatusUpdate('delivered')}
              disabled={updating || order.status === 'delivered'}
            >
              <FaCheckCircle /> Deliver
            </button>
          </div>
        </div>
      </div>

      <div className="order-items">
        <h3>Order Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items?.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="product-info">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;