import axios from "axios";
import { useEffect, useState } from "react";

const AllProduct = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/products');
        setItems(res.data);
        setFilteredItems(res.data);
        const unicategory = [...new Set(res.data.map(pro => pro.category))];
        setCategories(unicategory);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category) {
      setFilteredItems(items.filter(item => item.category === category));
    } else {
      setFilteredItems(items);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-semibold">Products</h2>
        <div className="flex items-center">
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
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Add Product
          </button>
        </div>
        </div>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Product Name</th>
            <th className="border px-4 py-2 text-left">Brand</th>
            <th className="border px-4 py-2 text-left">Price</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="3" className="border px-4 py-2 text-center">No products</td>
            </tr>
          ) : (
            filteredItems.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.brand}</td>
                <td className="border px-4 py-2">Rs.{item.price}</td>
                <td className="border px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="bg-blue-500 text-white px-3 rounded">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1">
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
