const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Career Navigator Backend API',
        status: 'running',
        timestamp: new Date().toISOString()
    });
});

app.post('/api/auth/login', (req, res) => {
    // Mock login for testing
    const { email, password } = req.body;

    res.json({
        status: 'success',
        token: 'mock-token-123',
        data: {
            user: {
                id: '1',
                name: 'Test User',
                email: email,
                role: 'user'
            }
        }
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
