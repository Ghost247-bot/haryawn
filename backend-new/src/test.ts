import axios from 'axios';

const API_URL = 'http://localhost:5000';

const testAPI = async () => {
  try {
    // Test root endpoint
    console.log('Testing root endpoint...');
    const root = await axios.get(API_URL);
    console.log('Root response:', root.data);

    // Test registration
    console.log('\nTesting registration...');
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'client'
    };
    const register = await axios.post(`${API_URL}/api/auth/register`, registerData);
    console.log('Registration response:', register.data);

    // Store the token
    const token = register.data.token;

    // Test login
    console.log('\nTesting login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };
    const login = await axios.post(`${API_URL}/api/auth/login`, loginData);
    console.log('Login response:', login.data);

    // Test profile
    console.log('\nTesting profile...');
    const profile = await axios.get(`${API_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Profile response:', profile.data);

  } catch (error: any) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error:', error.message);
    }
  }
};

testAPI(); 