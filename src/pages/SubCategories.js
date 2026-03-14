import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { getAllSubCategories, addSubCategory, updateSubCategory, deleteSubCategory } from '../services/subCategoryService';
import { getAllCategories } from '../services/categoryService';
import Table from '../components/Table';
import Modal from '../components/Modal';
import LoadingSpinner from '../components/LoadingSpinner';

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, mode: '', id: null });
  const [formData, setFormData] = useState({ 
    name: '', 
    categoryId: '',
    categoryName: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [subs, cats] = await Promise.all([
      getAllSubCategories(),
      getAllCategories()
    ]);
    setSubCategories(subs);
    setCategories(cats);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Please enter sub category name');
      return;
    }
    if (!formData.categoryId) {
      alert('Please select a category');
      return;
    }

    // Get category name for display
    const selectedCategory = categories.find(c => c.id === formData.categoryId);
    const dataToSave = {
      name: formData.name,
      categoryId: formData.categoryId,
      categoryName: selectedCategory?.name || ''
    };

    if (modal.mode === 'add') {
      await addSubCategory(dataToSave);
    } else {
      await updateSubCategory(modal.id, dataToSave);
    }
    await loadData();
    setModal({ show: false, mode: '', id: null });
    setFormData({ name: '', categoryId: '', categoryName: '' });
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteSubCategory(id);
      await loadData();
    }
  };

  const columns = [
    { 
      header: 'Sub Category', 
      accessor: 'name',
      align: 'left'
    },
    { 
      header: 'Category', 
      accessor: 'categoryName',
      align: 'left'
    },
    {
      header: 'Actions',
      accessor: (row) => (
        <div className="action-buttons" style={{ justifyContent: 'center' }}>
          <button 
            className="action-btn edit"
            onClick={() => {
              setFormData({
                name: row.name,
                categoryId: row.categoryId,
                categoryName: row.categoryName
              });
              setModal({ show: true, mode: 'edit', id: row.id });
            }}
          >
            <FaEdit /> Edit
          </button>
          <button 
            className="action-btn delete"
            onClick={() => handleDelete(row.id, row.name)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      )
    }
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="subcategories-page">
      <div className="page-header">
        <h1>Sub Categories</h1>
        <button 
          className="add-btn"
          onClick={() => {
            setFormData({ name: '', categoryId: '', categoryName: '' });
            setModal({ show: true, mode: 'add', id: null });
          }}
        >
          <FaPlus /> Add Sub Category
        </button>
      </div>

      <Table columns={columns} data={subCategories} />

      <Modal 
        isOpen={modal.show} 
        onClose={() => setModal({ show: false, mode: '', id: null })}
        title={modal.mode === 'add' ? 'Add Sub Category' : 'Edit Sub Category'}
      >
        <div className="form-group">
          <label>Category *</label>
          <select
            value={formData.categoryId}
            onChange={(e) => {
              const selectedCat = categories.find(c => c.id === e.target.value);
              setFormData({ 
                ...formData, 
                categoryId: e.target.value,
                categoryName: selectedCat?.name || ''
              });
            }}
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Sub Category Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter sub category name"
            autoFocus
          />
        </div>

        <div className="modal-actions">
          <button onClick={() => setModal({ show: false, mode: '', id: null })}>
            Cancel
          </button>
          <button onClick={handleSave} className="save-btn">
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SubCategories;