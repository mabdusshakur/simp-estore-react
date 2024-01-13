import { useEffect, useState } from "react";
import http from "../axios";
import { Link } from "react-router-dom";

function Product() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = () => {
        http.get(`/products?paginate=5&page=${page}`).then((res) => {
            const response = res.data.data;
            console.log(response);
            setProducts(response);
            setMeta(res.data.meta);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage = () => {
        if (page < meta.last_page) {
            setPage(page + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Regular Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Sale Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index) => {
                                    const handleDeleteProduct = (event) => {
                                        const productId = product.id;
                                        console.log(`Deleting Product with ID: ${productId}`);
                                    };
                                    return (
                                        <tr key={index} className="bg-white dark:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    {/* this replace backslash  is added due to the api response. */}
                                                    <img className="w-10 h-10 rounded-full" src={product.images[0].path.replace(/\\\\/g, '\\')} alt="product-image" />
                                                    <div>
                                                        <p className="font-semibold">{product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <p className="font-semibold">{product.regular_price}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div>
                                                        <p className="font-semibold">{product.sale_price}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <Link to={'/admin/dashboard/product/edit/' + product.id} className="text-blue-500 hover:text-blue-700 px-1">Edit</Link>
                                                <button className="text-red-500 hover:text-red-700 px-1" onClick={handleDeleteProduct}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <button onClick={handlePreviousPage} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={page === 1}>Previous</button>
                            </li>
                            {
                                Array.from({ length: meta.last_page }, (_, index) => (
                                    <li key={index}>
                                        <button onClick={() => handlePageClick(index + 1)} className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === index + 1 ? 'font-semibold' : ''}`}>{index + 1}</button>
                                    </li>
                                ))
                            }
                            <li>
                                <button onClick={handleNextPage} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" disabled={page === meta.last_page}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Product;