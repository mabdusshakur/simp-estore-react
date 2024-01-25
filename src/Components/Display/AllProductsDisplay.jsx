import { useEffect, useState } from "react";
import http from "../../axios";
import ProductCard from "../ProductCard";
import { useParams } from "react-router-dom";

function AllProductsDisplay() {
    const [products, setProducts] = useState([]);
    const {categoryId, subCategoryId} = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            
            if (categoryId && subCategoryId) {
                console.log("by sub-category " , categoryId, subCategoryId);
                const res = await http.get(`/products?subcategory_id=${subCategoryId}`);
                const response = res.data.data;
                setProducts(response);
                return;
            }
            if (categoryId) {
                console.log("by category " , categoryId);
                const res = await http.get(`/products?category_id=${categoryId}`);
                const response = res.data.data;
                setProducts(response);
                return;
            }
            const res = await http.get(`/products`);
            const response = res.data.data;
            setProducts(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="flex flex-wrap mt-5 justify-center">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        images={product.images}
                        price={product.sale_price != 0 ? product.sale_price : product.regular_price}
                    />
                ))}
            </div>
        </>
    );
}

export default AllProductsDisplay;