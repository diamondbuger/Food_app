const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@pizzahub.com' });
    if (adminExists) {
      console.log('✗ Admin user already exists');
      mongoose.connection.close();
      return;
    }

    // Create admin user
    const admin = new User({
      name: 'Admin',
      email: 'admin@pizzahub.com',
      password: 'admin123', // Change this in production!
      role: 'admin',
    });

    await admin.save();
    console.log('✓ Admin user created successfully');
    console.log('📧 Email: admin@pizzahub.com');
    console.log('🔐 Password: admin123');

    mongoose.connection.close();
  } catch (err) {
    console.error('✗ Error:', err.message);
    process.exit(1);
  }
};

createAdmin();
