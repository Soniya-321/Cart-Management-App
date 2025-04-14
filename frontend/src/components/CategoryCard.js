import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import API from '../services/api';
import './Sidebar.css';
const CategoryCard = ({ category , onUpdate}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [form, setForm] = useState({
    name: category.name,
    itemCount: category.itemCount,
    image: category.image,
  });

  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true);
    console.log("click")
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // API request to update the category
    try {
      const response = await API.put(`/api/categories/${category.id}`, {
        name: form.name,
        itemCount: form.itemCount,
        image: form.image,
      });
      
      if (response.status === 200) {
        onUpdate({...category, ...form});
        setShowModal(false); // ✅ Close the modal on success
        alert('Category updated successfully!');
      } else {
        alert('Failed to update category.'); // ⚠️ This shouldn't be triggered unless status is not 200
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the category.');
    }
  };

  return (
    <div 
      className="card position-relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={category.image} className="card-img-top" alt={category.name} />
      <div className="overlay"></div>
      {isHovered && (
          <button 
            className="edit-overlay-btn gap-1 text-primary btn btn-light d-flex flex-row 
            align-items-center justify-content-center position-absolute top-50 start-50 bottom-100 
            translate-middle p-3 mb-5 cursor-pointer"
            onClick={handleEditClick}
          >
            <CiEdit size={25} color='primary'  />
            <span>Edit</span>
          </button>
        )}
      <div className="card-body">
        <h5 className="card-title">{category.name}</h5>
        <p className="card-text">{category.itemCount} items</p>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-labelledby="editModalLabel" aria-hidden="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">Edit Category</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="itemCount" className="form-label">Item Count</label>
                    <input
                      type="number"
                      className="form-control border border-dark"
                      id="itemCount"
                      name="itemCount"
                      value={form.itemCount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image URL</label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      id="image"
                      name="image"
                      value={form.image}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
