const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    console.log('Attempting to connect to MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected Successfully to: ${conn.connection.host}`);
    
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    return conn;

  } catch (error) {
    console.error('MongoDB connection error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Provide more specific error messages
    if (error.message.includes('MONGODB_URI is not defined')) {
      console.error('Environment Error: MONGODB_URI is not properly configured');
    } else if (error.message.includes('bad auth')) {
      console.error('Authentication Error: Check your MongoDB username and password');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('Connection Error: MongoDB server is not reachable');
    }

    // Re-throw the error to be handled by the caller
    throw error;
  }
};

module.exports = connectDB;