import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      console.log(res.data)
      setproducts(res.data);
    }
    fetchdata();
  }, [])
  return (
    <div>
      <h1>Welcome to the FrontEnd</h1>
      {products.map((product) => {
        return (<div key={product.id}>
          <img src={product.thumbnail} />
        </div>)
      })}
    </div>
  )
}

export default App
