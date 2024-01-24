import { useEffect } from "react";
import http from "../axios";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard(props) {
    const { id, name, price, images } = props;
    const trimmedName = name.substring(0, 30);

    // useEffect(() => {
    //     checkProductAlreadyInWishlist();
    // }, []);
    const handleAddToCart = () => {
        http.post('/carts', { product_id: id, quantity: 1 }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert('Product Added to Cart Successfully');
            }
        }).catch((err) => { console.log(err); });
    };
    const handleWishlist = () => {
        http.post('/wishlists', { product_id: id }).then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert('Product Added to Wishlist Successfully');
            }
        }).catch((err) => { console.log(err); });
    };

    // const checkProductAlreadyInWishlist = async () => {
    //     await http.post(`/wishlist-exists/${id}`).then((res) => {
    //         if(res.data === true) {
    //             console.log('Product already in wishlist id = ', id);
    //             document.getElementById('wishlist').classList.remove('text-white');
    //             document.getElementById('wishlist').classList.add('text-red-500');
    //         }
    //     }).catch((err) => { console.log(err); });
    // };

    return (
        <>


            <div className="max-w-60 mx-1 my-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/product-details/${id}`}>
                    <img className="p-8 rounded-t-lg" src="/docs/images/products/apple-watch.png" alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                    <Link to={`/product-details/${id}`}>
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{trimmedName}</h5>
                    </Link>
                    <div className="flex items-center mt-2.5 mb-5">
                        <FaHeart className="text-xl text-red-500 cursor-pointer" id="wishlist" onClick={handleWishlist} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
                        <button onClick={handleAddToCart} className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductCard;