import React, { useState } from 'react';
import API from '../services/api';

const CategoryForm = ({ onCategoryAdded }) => {
  const [form, setForm] = useState({ name: '', itemCount: '', image: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/api/categories', form);
    setForm({ name: '', itemCount: '', image: '' });
    onCategoryAdded();
  };

  return (
    <form className="my-3" onSubmit={handleSubmit}>
      <div className="mb-2">
  <label htmlFor="name" className="form-label">Name</label>
  <input 
    className="form-control my-1 mb-2 border border-dark" 
    id="name" 
    placeholder="Category Name" 
    value={form.name} 
    onChange={(e) => setForm({ ...form, name: e.target.value })} 
    required 
  />
</div>

<div className="mb-2">
  <label htmlFor="itemCount" className="form-label">Item Count</label>
  <input 
    className="form-control my-1 mb-2 border border-dark" 
    id="itemCount" 
    placeholder="Item Count" 
    type="number" 
    value={form.itemCount} 
    onChange={(e) => setForm({ ...form, itemCount: e.target.value })} 
    required 
  />
</div>

<div className="mb-2">
  <label htmlFor="image" className="form-label">Image</label>
  <input 
    className="form-control my-1 mb-2 border border-dark" 
    id="image" 
    placeholder="Image URL" 
    value={form.image} 
    onChange={(e) => setForm({ ...form, image: e.target.value })} 
    required 
  />
</div>

<button className="btn btn-info mt-2 p-2 px-4">Add</button>

    </form>
  );
};

export default CategoryForm;