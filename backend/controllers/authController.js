const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
//const { use } = require('../routes/authRoutes');
dotenv.config();
let jwtToken = "";

exports.signup = (req, res) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).json({
      message: 'Missing required fields: username and password',
    });
  }
  else if (!username) {
    return res.status(400).json({
      message: 'Missing required field: username',
    })
  }
  else if (!password) {
    return res.status(400).json({
      message: 'Missing required field: password',
    })
  }
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ error: err });
    User.createUser(username, hash, (err) => {
      if (err) return res.status(400).json({ message: 'Username already exists' });
      res.status(201).json({ message: 'User created successfully' });
    });
  });
};


exports.login = (req, res) => {
  const { username, password } = req.body;
  User.findUser(username, (err, user) => {
    if (err || !user) return res.status(400).json({ message: 'Invalid username' });
    bcrypt.compare(password, user.password, (err, match) => {
      if (!match) return res.status(400).json({ message: 'Invalid password' });
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      jwtToken = token;
      req.token = token;
      res.json({ message: "Login Successfull", token, username: user.username });
    });
  });
};

exports.getToken = () => jwtToken;