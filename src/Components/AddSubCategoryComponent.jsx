import { useEffect, useState } from "react";
import http from "../axios";

function AddSubCategoryComponent() {
    const [subcategoryName, setSubCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        http.get(`/categories`).then((res) => {
            const response = res.data.data;
            setCategories(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(categoryId);
        http.post('/admin/sub-categories', { name: subcategoryName, category_id : categoryId }).then((res) => {
            if (res.data.status === 'success') {
                setSubCategoryName('');
                setCategoryId('');
                alert('SubCategory Added Successfully');
            }
        }).catch((err) => { console.log(err); });
    }
    return (
        <>
            <div className="container mx-auto px-4 my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input type="text" id="subcategoryName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="SubCategory Name" required value={subcategoryName} onChange={(e) => setSubCategoryName(e.target.value)} />
                        <select id="category" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setCategoryId(e.target.value)}>
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Sub-category</button>
                </form>
            </div>
        </>
    );
}

export default AddSubCategoryComponent;