import { useEffect, useState } from "react";
import http from "../axios";
import { Link } from "react-router-dom";

function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        http.get(`/orders`).then((res) => {
            const response = res.data.data;
            setOrders(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <>
            <div className="container mx-auto px-4">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Order Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Order;