const Category = require('../models/categoryModel');

exports.getCategories = (req, res) => {
  Category.getAllCategories((err, rows) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    res.json(rows);
  });
};

exports.addCategory = (req, res) => {
  const { name, itemCount, image } = req.body;
  if (!name || !itemCount || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  Category.createCategory(name, itemCount, image, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to add category' });
    res.status(201).json({ message: 'Category added' });
  });
};

exports.editCategory = (req, res) => {
  const { id } = req.params;
  const { name, itemCount, image} = req.body;
  // Build dynamic update fields
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (itemCount !== undefined) updates.itemCount = itemCount;
  if (image !== undefined) updates.image = image;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: 'No valid fields to update' });
  }
  
  Category.updateCategory(id, updates, (err) => {
    if (err) return res.status(500).json({ message: 'Update failed' });
    res.json({ message: 'Category updated' });
  });
};
