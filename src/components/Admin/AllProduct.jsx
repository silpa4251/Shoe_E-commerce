import axios from "axios";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AllProduct = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/products');
        setItems(res.data);
        setFilteredItems(res.data);
        const uniqueCategories = [...new Set(res.data.map(pro => pro.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const filterItems = (category, term) => {
    const filtered = items.filter(item => 
      (category ? item.category === category : true) &&
      (item.name.toLowerCase().includes(term.toLowerCase()) ||
      item.brand.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredItems(filtered);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterItems(category, searchTerm);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterItems(selectedCategory, term); 
  };

  const handleAdd = () => {
    navigate('/admin/add-product'); 
  };

  const handleEdit = (id) => {
    navigate(`/admin/productlist/${id}`); 
  };

  const handleDlt = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/products/${id}`);
      toast.success('Product deleted successfully');
      const updatedItems = items.filter(product => product.id !== id);
      setItems( updatedItems);
      setFilteredItems(selectedCategory, searchTerm);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
        <h2 className="text-3xl font-semibold check-head">Products</h2>
      <div className="flex justify-end mb-4">
      
        <div className="flex items-center">
          <div className="relative">
        <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border rounded p-2 mr-4"
          /><FaSearch size={20} className='absolute right-5 top-[11px] check-head' />
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded p-2 mr-4"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
         
          <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Add Product
          </button>
        </div>
      </div>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-4 py-2 text-left">Product Name</th>
            <th className="border px-4 py-2 text-left">Brand</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="4" className="border px-4 py-2 text-center">No products</td>
            </tr>
          ) : (
            filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-200">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.brand}</td>
                <td className="border px-4 py-2">Rs.{item.price}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEdit(item.id)} className="bg-blue-500 text-white px-3 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDlt(item.id)} className="bg-red-500 text-white px-3 py-1">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProduct;
