const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://bloc3-jo2024-back-1b523dbede86.herokuapp.com/' 
    : 'http://localhost:8080';

export default API_URL;