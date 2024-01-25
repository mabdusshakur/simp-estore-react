import { useEffect, useState } from 'react';
import http from '../../axios';

function CategoryTree() {
    const [showSubItems, setShowSubItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const toggleSubItems = (index) => {
        setShowSubItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems[index] = !updatedItems[index];
            return updatedItems;
        });
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
            <ul className="divide-y divide-gray-300 max-w-sm mx-auto mt-2 px-4 border">
                <li className="py-4">
                    <ul className="divide-y divide-gray-300 bg-gray-50 rounded-md px-4 py-2 mt-4">
                        {categories.map((category, index) => (
                            <li className="py-2" key={index}>
                                <div className="flex items-center space-x-4">
                                    <span className="text-md font-medium" onClick={() => toggleSubItems(index)}>
                                        {category.name}
                                    </span>
                                </div>
                                {showSubItems[index] && (
                                    <ul className="divide-y divide-gray-300 bg-gray-100 rounded-md px-4 py-2 mt-2">
                                        {category.sub_categories.map((subCategory, subIndex) => (
                                            <li className="py-2" key={subIndex}>
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-sm font-medium">{subCategory.name}</span>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </>
    );
}

export default CategoryTree;