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
    const [avatar, setAvatar] = useState([]);

    const { name, email, phone_number, address_1, address_2, city, country, postal_code } = user;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await http.get('/profile');
            const response = res.data.data;
            setUser(response);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("phone_number", phone_number);
            formData.append("address_1", address_1);
            formData.append("address_2", address_2);
            formData.append("city", city);
            formData.append("country", country);
            formData.append("postal_code", postal_code);
            formData.append("avatar", avatar);
            
            const res = await http.post('/profile', formData);
            console.info(res);
            if (res.status === 200) {
                alert('Profile Updated Successfully');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
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
                            <input id="name" name="name" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={name} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address_1" className="block text-sm font-medium leading-6 text-gray-900">
                            Address 1
                        </label>
                        <div className="mt-2">
                            <input id="address_1" name="address_1" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={address_1} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="address_2" className="block text-sm font-medium leading-6 text-gray-900">
                            Address 2
                        </label>
                        <div className="mt-2">
                            <input id="address_2" name="address_2" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={address_2} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                            City
                        </label>
                        <div className="mt-2">
                            <input id="city" name="city" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={city} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Country
                        </label>
                        <div className="mt-2">
                            <input id="country" name="country" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={country} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium leading-6 text-gray-900">
                            Postal Code
                        </label>
                        <div className="mt-2">
                            <input id="postal_code" name="postal_code" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={postal_code} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                            Phone Number
                        </label>
                        <div className="mt-2">
                            <input id="phone_number" name="phone_number" type="tel" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={phone_number} onChange={handleChange} />
                        </div>
                    </div>
                    <div>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="avatar" type="file" onChange={(e) => setAvatar(e.target.files[0])} />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}