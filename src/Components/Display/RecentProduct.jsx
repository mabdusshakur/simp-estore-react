import { useEffect, useState } from "react";
import http from "../../axios";
import ProductCard from "../ProductCard";

function RecentProduct() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        http.get(`/products?sort=created_at&order=desc`).then((res) => {
            const response = res.data.data;
            console.log(response);
            setProducts(response);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <div className="flex flex-wrap mt-5 justify-center">
                {
                    products.map((product) => (
                        <ProductCard key={product.id} name={product.name} price={product.regular_price} />
                    ))
                }
            </div>
        </>
    );
}

export default RecentProduct;