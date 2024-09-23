import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available_sizes: '',
    brand: '',
    image_url: '',
    in_stock: '',
    featured: false,
    stars: '',
    special_offer: '',
    discount: '',
    warranty: '',
    additional_details: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/products/${id}`, product);
      toast.success('product updated successfully')
      navigate('/admin/productlist');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Error in updating the product')
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-3xl font-semibold mb-4 check-head">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={product.image_url}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            <input
              type="checkbox"
              name="featured"
              checked={product.featured}
              onChange={handleChange}
              className="mr-2"
            />
            Featured
          </label>
        </div>
        <button type="submit" className=" check-btn px-4 py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct
