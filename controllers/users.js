const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, username, contactNumber, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      contactNumber,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req,res)=>{
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    
        if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid password' });
        }
    if(isPasswordValid){
      const payload = {
          name : user.name,
          username: user.username,
      }
      const token = jwt.sign(payload,"leadsconnect");
      return res.status(200).json({ 
        error: false,
        token,
        message: 'Login successful'
    });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req,res)=>{
  try {
    const { username } = req.params;

    const user = await User.findOne(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
}