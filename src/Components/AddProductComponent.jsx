import { useEffect, useState } from "react";
import http from "../axios";

function AddProductComponent() {
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
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
      
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <>
            
        </>
    );
}

export default AddProductComponent;