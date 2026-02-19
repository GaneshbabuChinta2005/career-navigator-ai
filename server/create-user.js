const axios = require('axios');

async function createUser() {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
            name: 'Demo User',
            email: 'demo@career.ai',
            password: 'Demo123!'
        });
        console.log('✅ Account created successfully!');
        console.log('Email:', 'demo@career.ai');
        console.log('Password:', 'Demo123!');
        console.log('Token:', response.data.token);
    } catch (error) {
        if (error.response) {
            console.log('❌ Error:', error.response.data.message);
        } else {
            console.log('❌ Error:', error.message);
        }
    }
}

createUser();
