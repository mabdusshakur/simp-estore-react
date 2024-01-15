import { useEffect } from "react";
import http from "../../axios";
import ProductCard from "../ProductCard";

function RecentProduct() {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        http.get(`/products?sort=created_at&order=desc`).then((res) => {
            const response = res.data.data;
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <div className="flex flex-wrap mt-5 justify-center">
                <ProductCard name="Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport" price="599" />
            </div>
        </>
    );
}

export default RecentProduct;