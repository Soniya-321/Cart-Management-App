import React, { useEffect, useState } from 'react';
import API from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../components/CategoryForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Modal } from 'bootstrap';
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await API.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateCategory = (updatedCat) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === updatedCat.id ? updatedCat : cat))
    );
  };

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);


  return (
    <>
      <Navbar />

      {/* Menu Button - Only for Small Screens */}
      <div
        className="bg-white text-dark fw-bold p-2 d-md-none"
        style={{ cursor: 'pointer', top: '100', marginTop: "4.3rem", marginBottom: "0px" }}
        onClick={toggleSidebar}
      >
        <HiOutlineMenuAlt2 size={25}/> Menu
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Main Content */}
      <div
        className={`main-content ${isSidebarOpen ? 'blurred' : ''}`}
        onClick={isSidebarOpen ? closeSidebar : null}
        style={{
          marginLeft: window.innerWidth >= 768 ? '250px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div className="container mt-6 d-flex flex-column gap-4" style={{ marginTop: '5.3rem' }}>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className='fw-bold'>Categories</h2>
              <button
                className="btn btn-primary ms-auto"
                data-bs-toggle="modal"
                data-bs-target="#addCategoryModal"
              >
                + Add Category
              </button>
            </div>
            <div
              className="modal fade"
              id="addCategoryModal"
              tabIndex="-1"
              aria-labelledby="addCategoryModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-white text-dark">
                  <div className="modal-header">
                    <h5 className="modal-title" id="addCategoryModalLabel">Add Category</h5>
                    <button
                      type="button"
                      className="btn-close btn-close-dark"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <CategoryForm
                      onCategoryAdded={() => {
                        fetchCategories();
                        const modal = Modal.getInstance(document.getElementById('addCategoryModal'));
                        modal.hide();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5 mr-4 w-100" >
              {categories.map((cat) => (
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3 mb-3" key={cat.id}>
                  <CategoryCard category={cat} onUpdate={updateCategory} />
                </div>
              ))}
            </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
