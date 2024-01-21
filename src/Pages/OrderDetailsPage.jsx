import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../axios";

function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const { name, email, phone_number, address_1, address_2, city, country, postal_code } = order;

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = () => {
        http.get(`/admin/orders/${id}`).then((res) => {
            const response = res.data.data;
            setOrder(response.user);
            setOrderItems(response.order_items);
            console.log(response.order_items);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <p className="text-sm underline m-2">Orderer Name : {name}</p>
                    <p className="text-sm underline m-2">Orderer Email : {email}</p>
                    <p className="text-sm underline m-2">Orderer Phone : {phone_number}</p>
                    <p className="text-sm underline m-2">Orderer Address_1 : {address_1}</p>
                    <p className="text-sm underline m-2">Orderer Address_2 : {address_2}</p>
                    <p className="text-sm underline m-2">Orderer City : {city}</p>
                    <p className="text-sm underline m-2">Orderer Country : {country}</p>
                    <p className="text-sm underline m-2">Orderer Postal-Code : {postal_code}</p>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-1">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <p className="text-xl m-2">Order Items : </p>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Product Name</th>
                                <th className="px-4 py-2">Product Price</th>
                                <th className="px-4 py-2">Product Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((orderItem) => (
                                <tr key={orderItem.id}>
                                    <td className="border px-4 py-2">{orderItem.product.name}</td>
                                    <td className="border px-4 py-2">{orderItem.price}</td>
                                    <td className="border px-4 py-2">{orderItem.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default OrderDetails;