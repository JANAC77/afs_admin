import React, { useState, useEffect, useCallback } from 'react';  // ✅ Add useCallback
import { useNavigate, useParams } from 'react-router-dom';
import { 
  getProductById,
  addProduct, 
  updateProduct 
} from '../services/productService';
import { getAllCategories } from '../services/categoryService';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    subCategory: '',
    description: '',
    image: '',
    popular: false,
    features: [],
    specifications: {}
  });

  // ✅ Wrap loadProduct in useCallback
  const loadProduct = useCallback(async () => {
    setLoading(true);
    const data = await getProductById(id);
    if (data) {
      setFormData(data);
    }
    setLoading(false);
  }, [id]);

  const loadCategories = async () => {
    const data = await getAllCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
    if (id) {
      loadProduct();  // ✅ Now this is stable
    }
  }, [id, loadProduct]);  // ✅ Add loadProduct to dependencies

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateProduct(id, formData);
      } else {
        await addProduct(formData);
      }
      navigate('/products');
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="product-form-page">
      <h1>{id ? 'Edit Product' : 'Add New Product'}</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price (₹) *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category</label>
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="/images/products/image.jpg"
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="popular"
              checked={formData.popular}
              onChange={handleChange}
            />
            Popular Product
          </label>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/products')}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Product' : 'Add Product')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;