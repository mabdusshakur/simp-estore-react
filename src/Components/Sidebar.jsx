import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";
import { FaBoxesStacked } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Sidebar() {
    const [nav, setNav] = useState(false);

    const menuItems = [
        { icon: <FaBoxOpen size={25} className="mr-4" />, text: "Category", href: "/admin/dashboard/category" },
        { icon: <FaBoxesStacked size={25} className="mr-4" />, text: "SubCategory", href: "/admin/dashboard/sub-category" },
        { icon: <FaBagShopping size={25} className="mr-4" />, text: "Product", href: "/admin/dashboard/product" },
    ];
    return (
        <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 shadow-sm">
            {/* Left side */}
            <div className="flex items-center">
                <div onClick={() => setNav(!nav)} className="cursor-pointer">
                    <AiOutlineMenu size={30} />
                </div>
            </div>

            {/* Mobile Menu */}
            {/* Overlay */}
            {nav ? (
                <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
            ) : (
                ""
            )}

            {/* Side drawer menu */}
            <div className={nav ? "fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300" : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"}>
                <AiOutlineClose onClick={() => setNav(!nav)} size={30} className="absolute right-4 top-4 cursor-pointer" />
                <nav>
                    <ul className="flex flex-col p-4 text-gray-800">
                        {menuItems.map(({ icon, text, href }, index) => {
                            return (
                                <div key={index} className=" py-4">
                                    <Link to={href}>
                                        <li className="text-sm flex cursor-pointer  w-[80%] rounded-full mx-auto p-2 hover:text-blue-500">
                                            {icon} {text}
                                        </li>
                                    </Link>
                                </div>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );

}

export default Sidebar;