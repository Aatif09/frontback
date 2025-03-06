import { useState, useEffect } from "react";
import axios from 'axios';
function Ap() {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const api = await axios.get("/api/products");
      console.log(api.data)
      setproducts(api.data);
    }
    fetchdata();
  }, [])

  return (
    <div>
      <h2>Welcome to Product Details</h2>
      {products.map((product) => {
        return (<div key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.thumbnail}></img>
        </div>)
      })}

    </div>
  )
}

export default Ap