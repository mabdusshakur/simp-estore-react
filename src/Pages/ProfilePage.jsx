import { useEffect, useState } from "react";
import http from "../axios";

export default function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone_number: "",
        address_1: "",
        address_2: "",
        city: "",
        country: "",
        postal_code: ""
    });

    const { name, email, phone_number, address_1, address_2, city, country, postal_code } = user;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        http.get('/profile').then((res) => {
            const response = res.data.data;
            setUser(response);
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Your Profile Info
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address_1" className="block text-sm font-medium leading-6 text-gray-900">
                                Address 1
                            </label>
                            <div className="mt-2">
                                <input id="address_1" name="address_1" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={user.address_1} onChange={(e) => setUser({ ...user, address_1: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="address_2" className="block text-sm font-medium leading-6 text-gray-900">
                                Address 2
                            </label>
                            <div className="mt-2">
                                <input id="address_2" name="address_2" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={user.address_2} onChange={(e) => setUser({ ...user, address_2: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input id="city" name="city" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <input id="country" name="country" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={user.country} onChange={(e) => setUser({ ...user, country: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="postal_code" className="block text-sm font-medium leading-6 text-gray-900">
                                Postal Code
                            </label>
                            <div className="mt-2">
                                <input id="postal_code" name="postal_code" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={user.postal_code} onChange={(e) => setUser({ ...user, postal_code: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input id="phone_number" name="phone_number" type="tel" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={phone_number} onChange={(e) => setUser({ ...user, phone_number: e.target.value })} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}