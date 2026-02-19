const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Simple User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    avatarUrl: String,
    targetRole: String,
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('User', userSchema);

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, email, password, targetRole } = req.body;
        const newUser = await User.create({ name, email, password, targetRole });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '90d' });

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    avatarUrl: newUser.avatarUrl,
                    targetRole: newUser.targetRole
                }
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '90d' });

        res.status(200).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatarUrl: user.avatarUrl,
                    targetRole: user.targetRole
                }
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Career Navigator AI API is running', status: 'healthy' });
});

// Database connection and server start
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/career-navigator';

const startServer = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 API: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.log('⚠️  Starting server without database...');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT} (No DB)`);
            console.log(`📍 API: http://localhost:${PORT}`);
        });
    }
};

startServer();
