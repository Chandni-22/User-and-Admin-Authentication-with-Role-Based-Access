require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./src/models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    return User.findOne({ email: 'admin@hyperverge.co' });
  })
  .then(existingAdmin => {
    if (existingAdmin) {
      console.log('Admin already exists');
      return mongoose.disconnect();
    }

    return bcrypt.hash('admin123', 10)
      .then(hashedPassword => {

        const admin = new User({
          username: 'admin',
          email: 'admin@hyperverge.co',
          password: hashedPassword,
          role: 'admin'
        });

        return admin.save();
      });
  })
  .then(result => {
    if (result) {
      console.log('Admin user created');
    }
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error creating admin:', err.message);
    mongoose.disconnect();
  });
