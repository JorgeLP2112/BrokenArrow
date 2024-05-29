import Link from 'next/link'
import Image from "next/image"
import { Disclosure } from "@headlessui/react";

const Navbar = () => {
    const navigation = [
        ""
    ];

    return (
        <div className="w-full">
            <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
                {/* Logo  */}
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                                <Link href="/">
                                    <span className="flex items-center space-x-2 text-2xl font-medium text-jkb-tertiary dark:text-gray-100">
                                        <span>
                                            <Image
                                                src="/logo.png"
                                                alt="Logo"
                                                width="32"
                                                height="32"
                                                className="w-8"
                                            />
                                        </span>
                                        <span>UniTalent</span>
                                    </span >
                                </Link >
                            </div >
                        </>
                    )}
                </Disclosure >
                <div className="hidden text-center lg:flex lg:items-center">
                    <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
                        {navigation.map((menu, index) => (
                            <li className="mr-3 nav__item" key={index}>
                                <Link href="/" className="inline-block px-4 py-2 text-lg font-normal text-gray-800 no-underline rounded-md dark:text-gray-300 hover:text-jkb-tertiary focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800">
                                    {menu}
                                </Link>
                            </li>

                        ))}
                        <li className="mr-3 nav__item">

                            <Link href="/Login" className="w-full px-6 py-2 mt-3 text-center text-white bg-jkb-tertiary rounded-md lg:ml-5">
                                Inicia Sesión
                            </Link>
                        </li>

                    </ul>
                </div>

            </nav>
        </div>
    );
}

export default Navbar;

