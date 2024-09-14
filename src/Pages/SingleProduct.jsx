import { useState, useEffect, useContext } from "react";
import { useParams , Link} from "react-router-dom";
import axios from "axios";
import Stars from "../components/Rating/Stars";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "react-toastify";

const SingleProduct = ({products}) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { dispatch} = useContext(ProductContext)


    const handleCart = () => {
      if(product) {
        dispatch({ type: 'Add', product });
        toast.success(`${product.name} added to cart`)
      }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/products/${id}`);
                setProduct(response.data);
                const relatedResponse = await axios.get(`http://localhost:4000/products?category=${response.data.category}`);
                setRelatedProducts(relatedResponse.data.filter(p => p.id !== response.data.id));
            } catch (err) {
                setError('Product not found. Please try again later.'+err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-lg text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-6 md:p-12">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                <div className="flex-shrink-0">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-64 object-cover md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg product-image"
                    />
                </div>
                <div className="p-6 flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <Stars stars={parseInt(product.stars)} />


                    <p className="text-xl text-gray-600 mb-2">{product.brand}</p>
                    <div className="mb-4">
                        <p className="text-xl text-gray-500 line-through">MRP: Rs.{(product.price + (50 * product.price) / 100).toFixed(2)}</p>
                        <p className="text-2xl font-semibold text-green-600">Offer price: Rs.{product.price.toFixed(2)}</p>
                    </div>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl text-gray-600 mb-2">Available sizes: {product.available_sizes}</p>
                    <p className="text-xl text-gray-600 mb-2">Warranty: {product.warranty}</p>
                    <p className="text-gray-600">{product.additional_details}</p>
                    <button onClick={handleCart} className="py-2 px-4 rounded-lg product-btn transition duration-300">Add to Cart</button>

                </div>
            </div>
            <div className="mt-12 mx-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Similar Products</h2>
                <div className="flex flex-wrap -mx-4"  >
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((relatedProduct) => (
                          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8">
                        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                                <Link to={`/products/${relatedProduct.id}`}>
                                    <img
                                        src={relatedProduct.image_url}
                                        alt={relatedProduct.name}
                                        className="w-full h-48 object-contain mb-4 product-image"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.name}</h3>

                                        <p className="text-gray-600">${relatedProduct.price}</p>
                                        <button onClick={() => dispatch({ type: 'Add', product: relatedProduct })} className=" py-2 px-4 rounded-lg product-btn transition duration-300">Add to Cart</button>

                                    </div>
                                </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No related products available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;

