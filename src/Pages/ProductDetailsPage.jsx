import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    useEffect(() => { fetchData() }, []);
    const fetchData = () => {
        http.get(`/products/${id}`).then((res) => {
            const response = res.data.data;
            console.log(response);
            setProduct(response);
        }).catch((err) => { console.log(err) });
    };
    return (
        <>
            <div className="container mx-auto px-4 my-5">
                <div className="mb-6">
                    <div className="grid grid-cols-4 gap-4">
                        {
                            // product.images.map((image, index) => {
                            //     return (
                            //         <div key={index}>
                            //             <img className="h-auto max-w-40" src={image.path.replace(/\\\\/, '\\')} alt="product image" />
                            //         </div>
                            //     );
                            // })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;