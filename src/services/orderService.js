import { 
  collection, 
  getDocs, 
  getDoc, 
  doc,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const ordersCollection = collection(db, 'orders');

// Get all orders
export const getAllOrders = async () => {
  try {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders;
  } catch (error) {
    console.error('Error getting orders:', error);
    return [];
  }
};

// Get order by ID
export const getOrderById = async (id) => {
  try {
    const docRef = doc(db, 'orders', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (id, status) => {
  try {
    const docRef = doc(db, 'orders', id);
    await updateDoc(docRef, {
      status,
      updatedAt: new Date().toISOString()
    });
    toast.success(`Order status updated to ${status}`);
    return true;
  } catch (error) {
    console.error('Error updating order:', error);
    toast.error('Failed to update order');
    throw error;
  }
};

// Delete order
export const deleteOrder = async (id) => {
  try {
    await deleteDoc(doc(db, 'orders', id));
    toast.success('Order deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting order:', error);
    toast.error('Failed to delete order');
    throw error;
  }
};

// Create order (from admin if needed)
export const createOrder = async (orderData) => {
  try {
    const orderWithTimestamp = {
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const docRef = await addDoc(ordersCollection, orderWithTimestamp);
    toast.success('Order created successfully');
    return { id: docRef.id, ...orderWithTimestamp };
  } catch (error) {
    console.error('Error creating order:', error);
    toast.error('Failed to create order');
    throw error;
  }
};