import { useEffect, useState } from "react";
import http from "../../axios";
import ProductCard from "../ProductCard";

function MostSoldProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await http.get(`/products?sort=sold_count&order=desc`);
            const response = res.data.data;
            console.log(response);
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
                        image={product.image}
                        price={product.sale_price != 0 ? product.sale_price : product.regular_price}
                    />
                ))}
            </div>
        </>
    );
}

export default MostSoldProduct;