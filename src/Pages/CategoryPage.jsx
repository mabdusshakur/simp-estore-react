import { useEffect, useState } from "react";
import http from "../axios";

function Category() {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState({});
    
        useEffect(() => {
            fetchData();
        }, [page]);

        const fetchData = () => {
            http.get(`/categories?paginate=2&page=${page}`).then((res) => {
                const response = res.data.data;
                setCategories(response);
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

        return (
            <>
                <div className="container mx-auto px-4">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Category Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Sub-Category Count
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Count
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map((category, index) => {
                                        return (
                                            <tr key={index} className="bg-white dark:bg-gray-700">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <p className="font-semibold">{category.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <p className="font-semibold">{category.sub_categories_count}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div>
                                                            <p className="font-semibold">{category.products_count}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm">
                                                    <button className="text-blue-500 hover:text-blue-700 px-1">Edit</button>
                                                    <button className="text-red-500 hover:text-red-700 px-1">Delete</button>
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

export default Category;