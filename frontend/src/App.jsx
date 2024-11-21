import { useEffect, useState } from 'react';
import axios from 'axios';  // Import Axios
import './App.css';
import { ProductCard } from './Components/ProductCard';
import { ProductForm } from './Components/ProductForm';
import ContactForm from './pages/ContactPage';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [products]);

  return (
    <div className="container mx-auto p-4">
      <ProductCard data={products} />

      <ProductForm />
      {/* <ContactForm/> */}

    </div>
  );
}

export default App;
