import { useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";

function OrderDetails() {
    const { id } = useParams();
    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        http.get(`/admin/orders/${id}`).then((res) => {
            const response = res.data;
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <>
            <div className="container mx-auto px-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <p className="text-sm underline m-2">Orderer Name : </p>
                    <p className="text-sm underline m-2">Orderer Email : </p>
                    <p className="text-sm underline m-2">Orderer Phone : </p>
                    <p className="text-sm underline m-2">Orderer Address_1 : </p>
                    <p className="text-sm underline m-2">Orderer Address_2 : </p>
                    <p className="text-sm underline m-2">Orderer City : </p>
                    <p className="text-sm underline m-2">Orderer Country : </p>
                    <p className="text-sm underline m-2">Orderer Postal-Code : </p>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;