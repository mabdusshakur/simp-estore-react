import { useState } from "react";
import http from "../axios";

function SearchComponent() {
    const [search, setSearch] = useState("");
    
    const handleSearch = async(e) => {
        setSearch(e.target.value);
        const res = await http.get(`/products?search=${search}`);
        const response = res.data.data;
        console.log(response);
    };
    return (
        <>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" value={search} onChange={handleSearch} />

                <ul className="absolute mt-2 py-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <li className="px-4 py-2 hover:bg-gray-100">
                        sssssss
                    </li>
                </ul>
            </div>
        </>
    );
}

export default SearchComponent;