import { useEffect, useState } from 'react';
import http from '../axios';
import { Link } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await http.get(`/carts`).then((res) => {
            const response = res.data.data;
            console.log(response);
            setCart(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleDeleteAllCart = async (event) => {
        await http.post(`/carts/destroy-all`).then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert('All Cart deleted successfully');
                fetchData();
            }
        }).catch((err) => { console.log(err); });
    };

    const handleIncrement = async (event, id) => {
        await http.post(`/carts/increment/${id}`).then((res) => {
            if (res.status === 200) {
                fetchData();
            }
        }).catch((err) => { console.log(err); });
    };

    const handleDecrement = async (event, id) => {
        await http.post(`/carts/decrement/${id}`).then((res) => {
            if (res.status === 200) {
                fetchData();
            }
        }).catch((err) => { console.log(err); });
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
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((cart, index) => {
                                    const handleDeleteCart = (event) => {
                                        console.log(cart.id);
                                        const cartId = cart.id;
                                        http.delete(`/carts/${cartId}`).then((res) => {
                                            if (res.status === 200) {
                                                alert('Cart deleted successfully');
                                                fetchData();
                                            }
                                        }).catch((err) => { console.log(err); });
                                    };
                                    return (
                                        <tr key={index} className="bg-white dark:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {/* this replace backslash  is added due to the api response. */}
                                                    <img className="w-10 h-10 rounded-full" src={cart.product.images[0].path.replace(/\\\\/, '\\')} alt="product-image" />
                                                    <div>
                                                        <p className="font-semibold">{cart.product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <div className="relative flex items-center max-w-[8rem]">
                                                    <button onClick={(e) => cart.quantity > 1 ? handleDecrement(e, cart.id) : ''} type="button" id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" d="M1 1h16" />
                                                        </svg>
                                                    </button>

                                                    <p id="helper-text-explanation" className="p-1 text-sm text-gray-500 dark:text-gray-400">{cart.quantity}</p>

                                                    <button onClick={(e) => handleIncrement(e, cart.id)} type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                        <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button className="text-red-500 hover:text-red-700 px-1" onClick={handleDeleteCart}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div className="px-6 py-4 text-sm flex justify-between">
                        <button className="text-red-500 hover:text-red-700 px-1" onClick={handleDeleteAllCart}>Delete All</button>
                        <Link className="text-green-500 hover:text-green-700 px-1" to={'/checkout'}>Checkout</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;