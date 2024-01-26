import { useEffect, useState } from 'react';
import http from '../../axios';
import { Link } from 'react-router-dom';

function CategoryTree2() {
    const [categories, setCategories] = useState([]);
    const [showSubCategoryList, setShowSubCategoryList] = useState([]);

    const toggleSubCategoryList = (index) => {
        setShowSubCategoryList((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = !updatedItems[index];
            return updatedItems;
        });
    };

    const hideSubCategoryList = () => {
        setShowSubCategoryList([]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await http.get('/categories');
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                <span className="text-white">All Categories</span>

                <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                    {categories.map((category, index) => (
                        <div key={index}>

                            <div className="flex items-center px-6 py-3 hover:bg-gray-100 transition" key={index} onMouseOver={() => toggleSubCategoryList(index)} onMouseLeave={hideSubCategoryList} >
                                <span className="text-gray-600 text-sm" >
                                    <Link to={`/all-products/${category.id}`}>{category.name}</Link>
                                </span>
                                {showSubCategoryList[index] && (
                                    <div className="absolute left-full top-0 bg-white shadow-md py-3 px-6" onMouseOver={() => toggleSubCategoryList(index)}  >
                                        <ul className="space-y-2">
                                            {category.sub_categories.map((subCategory, subIndex) => (
                                                <li key={subIndex}>
                                                    <div href="#" className="text-gray-600 hover:text-gray-800">
                                                        <Link to={`/all-products/${category.id}/${subCategory.id}`} className="text-sm font-medium">{subCategory.name}</Link>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategoryTree2;