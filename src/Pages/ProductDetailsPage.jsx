import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [images, setImages] = useState([]);
    useEffect(() => { fetchData() }, []);
    const fetchData = () => {
        http.get(`/products/${id}`).then((res) => {
            const response = res.data.data;
            setProduct(response);
            setImages(response.images);
        }).catch((err) => { console.log(err) });
    };
    return (
        <>
            <div className="container mx-auto px-4 my-5">
                <div className="grid grid-cols-2">
                    <div className="grid grid-cols-2 gap-4">
                        {
                            images.map((image, index) => {
                                return (
                                    <div key={index}>
                                        <img className="h-auto max-w-60" src={image.path.replace(/\\\\/, '\\')} alt="product image" />
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>
                        <div className="grid grid-cols-4 gap-4">
                            <div className="col-span-2">
                                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray">{product.name}</h1>
                            </div>
                            <div className="col-span-2">
                                <h1 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray">Price : ${product.sale_price != 0 ? product.sale_price : product.regular_price}</h1>
                            </div>
                            <div className="col-span-4">
                                <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-gray">Description : </h1>
                            </div>
                            <div className="col-span-4">
                                <p className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray">{product.description}</p>
                            </div>
                            <div className="col-span-4">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;