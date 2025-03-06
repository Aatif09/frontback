import './App.css';
import { useState } from 'react';
import axios from 'axios';

function Appp() {
  const [page, setPage] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/login', { username, password });
      if (res.status === 200) {
        setPage('products'); 
        fetchProducts(); 
      }
    } catch (error) {
      alert('Login failed. Invalid username or password.' + error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', { username, password });
      if (res.status === 201) {
        alert('User registered successfully! Please login.');
        setPage('login'); 
      }
    } catch (error) {
      alert('Registration failed. User might already exist.' + error.message);
    }
  };


  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  return (
    <div className="App">
      <h1>Welcome to the Frontend</h1>
      {page === 'login' && (
        <div>
          <h2>Login</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>
            Don't have an account? <span onClick={() => setPage('register')}>Register</span>
          </p>
        </div>
      )}

      {page === 'register' && (
        <div>
          <h2>Register</h2>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <p>
            Already have an account? <span onClick={() => setPage('login')}>Login</span>
          </p>
        </div>
      )}

      {page === 'products' && (
        <div>
          <h2>Products</h2>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appp;
