import { useState } from "react";
import http from "../axios";
import { Link } from "react-router-dom";

function SearchComponent() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        if (e.target.value.length > 2) {
            const res = await http.get(`/products?search=${search}`);
            const response = res.data.data;
            setProducts(response);
        } else {
            setProducts([]);
        }
    };

    return (
        <>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" value={search} onChange={handleSearch} />
                {search.length > 2 && (
                    <ul className="absolute mt-2 py-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                        {products.map((product) => (
                            <li key={product.id} className="px-4 py-2 hover:bg-gray-100">
                                <Link to={`/product-details/${product.id}`}>
                                    {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default SearchComponent;