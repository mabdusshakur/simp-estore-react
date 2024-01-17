import { useEffect, useState } from 'react';
import http from '../axios';

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        http.get(`/wishlists`).then((res) => {
            const response = res.data.data;
            console.log(response);
            setWishlist(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <div className="container mx-auto px-4 mt-5">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wishlist.map((wishlist, index) => {
                                    const handleDeleteWishlist = (event) => {
                                        console.log(wishlist.id);
                                        const wishlistId = wishlist.id;
                                        http.delete(`/wishlists/${wishlistId}`).then((res) => {
                                            if (res.status === 200) {
                                                alert('Wishlist deleted successfully');
                                                fetchData();
                                            }
                                        }).catch((err) => { console.log(err); });
                                    };
                                    return (
                                        <tr key={index} className="bg-white dark:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {/* this replace backslash  is added due to the api response. */}
                                                    <img className="w-10 h-10 rounded-full" src={wishlist.product.images[0].path.replace(/\\\\/, '\\')} alt="product-image" />
                                                    <div>
                                                        <p className="font-semibold">{wishlist.product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button className="text-red-500 hover:text-red-700 px-1" onClick={handleDeleteWishlist}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Wishlist;