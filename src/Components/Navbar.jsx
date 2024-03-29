import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../authManager";
import SearchComponent from "./SearchComponent";
import http from "../axios";
import CategoryTree2 from "./Display/CategoryTree2";
const navigation = [
    { name: 'Home', href: '/', current: false, visible: true },
    { name: 'Cart', href: '/cart', current: false, visible: false },
    { name: 'Wishlist', href: '/wishlist', current: false, visible: false },
    { name: 'Dashboard', href: '/admin/dashboard', current: false, visible: true, admin: true },
    { name: 'Login', href: '/login', current: false, visible: true },
    { name: 'Register', href: '/register', current: false, visible: true },
    { name: 'Logout', href: '/logout', current: false, visible: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    const current = useLocation().pathname;
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        http.get('/profile').then((res) => {
            const response = res.data.data;
            setAvatar(response.avatar);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    navigation.forEach((pathname) => {
        if (pathname.href === current) {
            pathname.current = true;
        } else {
            pathname.current = false;
        }
    });
    if (isLoggedIn()) {
        navigation.forEach((pathname) => {
            if (pathname.href === '/login' || pathname.href === '/register') {
                pathname.visible = false;
            } else {
                pathname.visible = true;
            }
        });
    }
    if (!isAdmin()) {
        navigation.forEach((pathname) => {
            if (pathname.admin) {
                pathname.visible = false;
            }
        });
    }
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-shrink-0 items-center">
                                <CategoryTree2 />
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <span className="text-white">Simp-Estore</span>
                                </div>
                                <div className="hidden sm:ml-6 sm:block">

                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            item.visible ? (
                                                <Link key={item.name} to={item.href} className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')} aria-current={item.current ? 'page' : undefined}>
                                                    {item.name}
                                                </Link>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <SearchComponent />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={avatar.replace(/\\\\/, '\\')}
                                                alt="avatar"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/profile" className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                item.visible ? (
                                    <Link key={item.name} as="a" href={item.href} className={classNames(item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white", "block rounded-md px-3 py-2 text-base font-medium")} aria-current={item.current ? "page" : undefined}>
                                        {item.name}
                                    </Link>) : null
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
