import { useState } from "react";
import http from "../axios";

function AddCategoryComponent() {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        http.post('/admin/categories', { name : categoryName }).then((res) => {
            if(res.status === 200) {
                setCategoryName('');
                alert('Category Added Successfully');
            }
        }).catch((err) => { console.log(err); });
    }
    return (
        <>
            <div className="container mx-auto px-4 my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input type="text" id="categoryName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category Name" required value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Category</button>
                </form>
            </div>
        </>
    );
}

export default AddCategoryComponent;