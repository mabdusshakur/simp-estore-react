import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import http from '../axios';

function EditProductComponent() {
    const { id } = useParams();
    const [categoryId, setCategoryId] = useState();
    const [categories, setCategories] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState();
    const [subCategories, setSubCategories] = useState([]);
    const [productName, setProductName] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [stock, setStock] = useState('');
    const [images, setImages] = useState([]);

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
        http.get(`/sub-categories`).then((res) => {
            const response = res.data.data;
            setSubCategories(response);
        }).catch((err) => {
            console.log(err);
        });
        http.get(`/products/${id}`).then((res) => {
            const response = res.data.data;
            setProductName(response.name);
            setRegularPrice(response.regular_price);
            setSalePrice(response.sale_price);
            setDescription(response.description);
            setStatus(response.status);
            setStock(response.stock);
            setCategoryId(response.category_id);
            setSubCategoryId(response.subcategory_id);
        }).catch((err) => { console.log(err) });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('regular_price', regularPrice);
        formData.append('sale_price', salePrice);
        formData.append('description', description);
        formData.append('status', status);
        formData.append('stock', stock);
        formData.append('category_id', categoryId);
        formData.append('subcategory_id', subCategoryId);
        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);
        }
        http.post(`/admin/products/${id}`, formData).then((res) => {
            if (res.status === 200) {
                alert('Product Updated Successfully');
            }
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <div className="container mx-auto px-4 my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input type="text" id="subcategoryName" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name" required value={productName} onChange={(e) => setProductName(e.target.value)} />
                        <input type="text" id="subcategoryName" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Description" required value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input type="number" id="subcategoryName" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Regular Price" required value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} />
                        <input type="number" id="subcategoryName" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sale Price" required value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
                        <input type="number" id="subcategoryName" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Status" required value={status} onChange={(e) => setStatus(e.target.value)} />
                        <input type="number" id="subcategoryName" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Stock" required value={stock} onChange={(e) => setStock(e.target.value)} />
                        <select id="category" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setCategoryId(e.target.value)}>
                            {
                                categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            }
                        </select>
                        <select id="subcategory" className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSubCategoryId(e.target.value)}>
                            {
                                subCategories.map((subcategory) => (
                                    <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                                ))
                            }
                        </select>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="images" type="file" multiple onChange={(e) => setImages(e.target.files)} />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Product</button>
                </form>
            </div>
        </>
    );
}

export default EditProductComponent;