import fetch from 'node-fetch';

const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:8000');
    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};

testAPI(); 